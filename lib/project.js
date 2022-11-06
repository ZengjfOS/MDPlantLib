const fs = require("fs")
const fse = require('fs-extra');
const path = require("path")

function fileAbstract(fileContentArr) {
	let startAbstract = false;

	for (let i = 0; i < fileContentArr.length; i++) {
		let element = fileContentArr[i].trim();

		if (element.startsWith("# ") && (startAbstract == false)) {
			startAbstract = true;
			continue;
		}

		if (startAbstract) {
			if (element.length > 0) {
				if (element.startsWith("#"))
					return "Empty Abstract";
				else
					return element;
			}
		}
	}

	return "Empty Abstract";
}

function refreshProjectReadme(outputFile, subProjectDir) {

    if (subProjectDir == undefined || subProjectDir == null)
        return ""

    let subProjectIndexRegex = new RegExp("^(\\d{0,4})_")
    let outputString = "NO.|文件名称|摘要\n"
    outputString += ":--:|:--|:--\n"
    let outputStringArray = []

    let dirs = fs.readdirSync(subProjectDir);
    dirs.forEach((dir) => {
        let dirFlag = false
        let subProjectWorkFile = ""
        if (fs.lstatSync(subProjectDir + "/" + dir).isDirectory()) {
            subProjectWorkFile = subProjectDir + "/" + dir + "/README.md"

            dirFlag = true
        } else {
            subProjectWorkFile = subProjectDir + "/" + dir
        }

        if (fs.existsSync(subProjectWorkFile)) {
            let indexMatch = subProjectIndexRegex.exec(dir.toString())
            if (indexMatch) {
                let subPorjectIndex = indexMatch[1]
                const fileContent = fs.readFileSync(subProjectWorkFile, 'utf8').split(/\r?\n/)
                let fabs = fileAbstract(fileContent)

                if (dirFlag)
                    outputStringArray.push(subPorjectIndex + "| [" + dir.toString().split(subPorjectIndex + "_").join("") + "](" + (subProjectDir + "/" + dir + "/README.md").replace(/ /g, "%20") + ") | " + fabs + "\n");
                else
                    outputStringArray.push(subPorjectIndex + "| [" + dir.toString().split(subPorjectIndex + "_").join("").split("\.md").join("") + "](" + (subProjectDir + "/" + dir).replace(/ /g, "%20") + ") | " + fabs + "\n");

                // console.log(dir);
            }
        }
    })

    for (let i = 0; i < outputStringArray.length; i++) {
        outputString += outputStringArray[outputStringArray.length - 1 - i];
    }

    if (outputFile != undefined || outputFile != null) {
        const fileContent = fs.readFileSync(outputFile, 'utf8').split(/\r?\n/);
        var outFile = fs.createWriteStream(outputFile);
        var docsFlag = false
        
        for (let row = 0; row < fileContent.length; row++) {
            // 写入docs部分
            if (fileContent[row].startsWith("#") && fileContent[row].includes("# docs")) {
                outFile.write(fileContent[row] + "\n\n")
                outFile.write(outputString)

                docsFlag = true

                continue
            }

            // 判断docs部分是否结束
            if (docsFlag && fileContent[row].startsWith("#") && fileContent[row].includes("# ")){
                outFile.write("\n")
                docsFlag = false
            }

            // 原来的docs部分不用写，忽略
            if (docsFlag)
                continue

            if (row == (fileContent.length - 1)) {
                if (fileContent[row].trim().length == 0)
                    break
            }

            outFile.write(fileContent[row] + "\n")
        }
        outFile.close()
    }

    return outputString
}

function newProject(outputDir, author) {
    let files = fs.readdirSync(outputDir);

    if (files.filter(e => e != ".git").length == 0) {
        fse.copySync(__dirname + "/res/mainProjectTemplate", outputDir)

        // custom conf.py
        const fileContent = fs.readFileSync(outputDir + "/conf.py.template", 'utf8').split(/\r?\n/);
        let confFile = fs.createWriteStream(outputDir + "/conf.py")
        for (let i = 0; i < fileContent.length; i++) {
            let line = fileContent[i];
            if (line.startsWith("author = ")) {
                line = "author = '" + author + "'"
                fileContent[i] = line
            }
            confFile.write(line + "\n");
        }
        confFile.close()
        fs.unlinkSync(outputDir + "/conf.py.template")

        return true
    } else 
        return false
}

function newSubProject(subProjectDir) {
    let dirs = ["docs/images", "docs/refers"]

    fs.mkdirSync(subProjectDir)
    fse.copySync(__dirname + "/res/subProjectTemplate", subProjectDir)

    dirs.forEach(val => {
        fs.mkdirSync(subProjectDir + "/" + val)
    })
}

function newSubProjectWorkFile(outputFile) {
    let fileName = path.basename(outputFile)

    let fileContent = "# " + fileName.replace(/^\d{1,4}_/, "").split(".")[0].replace(/_/gi, " ") + "\n"
    fileContent += "\n"
    fileContent += "write your first doc at here...\n"
    fileContent += "\n"
    fileContent += "# steps\n"
    fileContent += "\n"
    fileContent += "* 思考\n"
    fileContent += "* 思考\n"
    fileContent += "* 思考\n"

    fs.writeFileSync(outputFile, fileContent)
}


module.exports = {
    refreshProjectReadme,
    newProject,
    newSubProject,
    newSubProjectWorkFile,
}
