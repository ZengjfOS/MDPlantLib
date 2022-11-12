const { count } = require('console');
const fs = require('fs');

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

/**
 * 
 * @param {string} outputFile 
 * @param {string} subProjectDir 
 * @returns {string}
 */
function refreshReadme(outputFile, subProjectDir) {

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

        if (!subProjectWorkFile.endsWith(".md"))
            return

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

function charNum(str){
    // 中文
    var re = /[\u4E00-\u9FA5]/g
    // 中文标点
    var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g
    var hanziNum = 0
    var biaodianNum = 0
    var value = str
    if(value.match(re)!=null){
        hanziNum = value.match(re).length
    }
    if(value.match(reg)!=null){
        biaodianNum =  value.match(reg).length
    }

    //中文字及符号均为两个字节
    return value.length + hanziNum + biaodianNum
}

/**
 * 
 * @param {string} configPath 
 * @param {string} table json key
 * @returns {string}
 */
function convertJSON2Table(configPath, table) {
    let outputString = []
    let splitString = " | "
    let tableEntry = {}
    let maxColume = 0

    try {
        const data = fs.readFileSync(configPath, 'utf8');

        // parse JSON string to JSON object
        const config = JSON.parse(data);
        tableEntry = eval('config.' + table)
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
        return ""
    }

    if (tableEntry.hasOwnProperty("titles") && tableEntry.hasOwnProperty("datas")) {
        let countColume = 0
        let countRow = 1
        let rowString

        rowString = []
        tableEntry.titles.forEach(element => {
            if (countColume == 0)
                rowString.push(element.padEnd(4, " "))
            else
                rowString.push(element)
            
            countColume++
            if (countColume > maxColume)
                maxColume = countColume
        })
        outputString.push(rowString.join(splitString))

        tableEntry.datas.forEach(e => {
            rowString = []
            countColume = 0

            e.forEach(element => {
                if (typeof(element) == "string" && element.trim() == "*" && countColume == 0) {
                    rowString.push(("" + countRow).padStart(4, "0"))
                } else if (Array.isArray(element)) {
                    let arrayString = []
                    let linkSplit = "<br> "

                    element.forEach(link => {
                        if (link.hasOwnProperty("title") && link.hasOwnProperty("link")) {
                            arrayString.push("* [" + link.title+ "](" + link.link + ")")
                        }
                    })
                    rowString.push(arrayString.join(linkSplit))
                } else if (typeof(element) == "object") {
                    if (element.hasOwnProperty("title") && element.hasOwnProperty("link")) {
                        rowString.push("[" + element.title+ "](" + element.link + ")")
                    }
                } else {
                    if (countColume == 0) {
                        rowString.push(("" + element).padStart(4, "0"))
                    } else {
                        rowString.push(element)
                    }
                }

                countColume++
                if (countColume > maxColume)
                    maxColume = countColume
            })

            outputString.push(rowString.join(splitString))
            countRow++
        })

        let titleLengthIndex = outputString[0].split(splitString).length - 1
        rowString = []
        for (i = 0; i < maxColume; i ++) {
            rowString.push("-----")

            if (titleLengthIndex < i)
                outputString[0] += splitString + "empty"
        }
        outputString.splice(1, 0, rowString.join(splitString.trim()))

        return outputString.join("\n")
    } else
        return ""
}

/**
 * 
 * @param {string} configPath 
 * @returns {string}
 */
function convertCSV2Table(configPath) {
    let outputString = []
    let splitString = " | "
    let data

    try {
        data = fs.readFileSync(configPath, 'utf8');
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
        return ""
    }

    let countColume = 0
    let countRow = 0
    let maxColume = 0
    let rowString = []
    data.split(/\r?\n/).forEach(e => {
        countColume = 0
        rowString = []
        e.split(",").forEach(element => {
            element = element.trim()
            if (countColume == 0) {
                if (element.trim() == "*") {
                    rowString.push(("" + countRow).padStart(4, "0"))
                } else {
                    if (countRow == 0)
                        rowString.push(element.padEnd(4, " "))
                    else
                        rowString.push(element.padStart(4, "0"))
                }
            } else {
                rowString.push(element)
            }

            countColume++
        })

        outputString.push(rowString.join(splitString))

        countRow++

        if (maxColume < countColume)
            maxColume = countColume
    })

    let titleLengthIndex = outputString[0].split(splitString).length - 1
    rowString = []
    for (i = 0; i < maxColume; i ++) {
        rowString.push("-----")

        if (titleLengthIndex < i)
            outputString[0] += splitString + "empty"
    }
    outputString.splice(1, 0, rowString.join(splitString.trim()))

    return outputString.join("\n")
}

/**
 * 
 * @param {string} lineValue 
 * @returns {string}
 */
function convertRowColume2Table(lineValue) {
    let tableRegex = new RegExp("\\s*table[\\s:]*(\\d*)[x\\s*]*(\\d*)\\s*")
    let outputString = ""

    let tableMatchValue = tableRegex.exec(lineValue)
    if (tableMatchValue != null) {

        for (let row = 0; row < Number(tableMatchValue[1]) + 2; row++) {
            for (let col = 0; col < Number(tableMatchValue[2]); col++) {
                if (row == 0) {
                    if (col == 0) {
                        outputString += " NO. "
                    } else {
                        outputString += "col " + (col + 1)
                    }

                    if (col != (Number(tableMatchValue[2]) - 1)) {
                        outputString += " | "
                    }
                }

                if (row == 1) {
                    outputString += "-----"

                    if (col != (Number(tableMatchValue[2]) - 1)) {
                        outputString += "-|-"
                    }
                }

                if (row > 1) {

                    if (col == 0) {
                        outputString += (" " + ((row - 2) + 1)).padEnd(5, ' ')
                    } else {
                        outputString += "     "
                    }

                    if (col != (Number(tableMatchValue[2]) - 1)) {
                        outputString += " | "
                    }
                }
            }

            if (row != Number(tableMatchValue[1]) + 2 - 1)
                outputString += "\n"
        }

        return outputString.substring(0, outputString.length - 1)
    } else
        return outputString
}

/**
 * 
 * @param {string} lineValue 
 * @returns {string}
 */
function convert2Table(lineValue) {
    let tableRowColumeRegex = new RegExp("\\s*table[\\s:]*(\\d*)[x\\s*]*(\\d*)\\s*", "g")
    let tableJSONRegex = new RegExp("\\s*table[\\s:]*([\\w\\/]*\\.(json|csv))", "g")

    let tableMatchValue = tableRowColumeRegex.exec(lineValue)
    if (tableMatchValue != null && tableMatchValue[1].length != 0 && tableMatchValue[2].length != 0) {
        // console.log("row colume: " + tableMatchValue)
        return convertRowColume2Table(lineValue)
    }

    tableMatchValue = tableJSONRegex.exec(lineValue)
    if (tableMatchValue != null) {
        // console.log("json: " + tableMatchValue)
        if (tableMatchValue[2] == "json")
            return convertJSON2Table(tableMatchValue[1], "table")
        else if (tableMatchValue[2] == "csv")
            return convertCSV2Table(tableMatchValue[1])
    }
}

/**
 * 
 * @param {string[]} textBlock 
 * @param {string} rootPath 
 * @param {int} cursor 
 * @returns 
 */
function isTable(textBlock, rootPath, cursor) {
    let found = false
    let type = ""
    let matchValue
    let tableRE = new RegExp("^table[\\s:]*((\\d*)[x\\s*]*(\\d*)|([\\w\\/]*\\.json))$", "g")

    if (textBlock[cursor].trim().length == 0)
        return found

    if (textBlock[0].trim().startsWith("NO.|文件名称|摘要")) {
        console.log("table for docs found")
        found = true
    } else if (textBlock[cursor].includes(" | ")) {
        console.log("table found")
        found = true
    } else if (matchValue = tableRE.exec(textBlock[cursor].trim())){
        console.log("table cmd found")
        found = true
    }

    // todo

    if (found)
        return {"status": found, "info": type}
    else 
        return null
}

module.exports = {
    refreshReadme,
    convertJSON2Table,
    convertRowColume2Table,
    convert2Table,
    isTable,
}
