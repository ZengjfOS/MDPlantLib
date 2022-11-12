const fs = require("fs")
const fse = require('fs-extra');
const path = require("path")

const indentjs = require('./indent.js')
const tablejs = require('./table.js')
const plantumljs = require('./plantuml.js')
const pastejs = require('./paste.js')
const listjs = require('./list.js');
const { table } = require("console");

/**
 * 
 * @param {string} outputDir 
 * @param {string} author 
 * @returns {boolean}
 */
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

/**
 * 
 * @param {string} subProjectDir 
 */
function newSubProject(subProjectDir) {
    let dirs = ["docs/images", "docs/refers"]

    fs.mkdirSync(subProjectDir)
    fse.copySync(__dirname + "/res/subProjectTemplate", subProjectDir)

    dirs.forEach(val => {
        fs.mkdirSync(subProjectDir + "/" + val)
    })
}

/**
 * 
 * @param {string} outputFile 
 */
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

/**
 * 
 * @param {workspaceFolder[]} workspaceFolders 
 * @param {string} filePath 
 * @returns {string}
 */
function getRootPath(workspaceFolders, filePath) {
    let output = ""
    workspaceFolders.forEach(workspaceFolder => {
        if (filePath.includes(workspaceFolder.url.path)) {
            output = workspaceFolder.url.path
        }
    })

    return output
}

let projectPathTypeEnum = {
    none: 0,
    dir: 1,
    file: 2,
    readme: 3,
};

/**
 * * dir
 *   [
 *     'src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up/docs/images',
 *     'src/0002_bring_up/docs/0003_bring_up/',
 *     'docs/0003_bring_up/',
 *     'docs',
 *     '0003',
 *     'bring_up',
 *     'docs/0004_bring_up',
 *     'docs',
 *     '0004',
 *     'bring_up',
 *     'docs',
 *     'images',
 *     index: 1,
 *     input: '/src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up/docs/images',
 *     groups: undefined
 *   ]
 * 
 * * file
 *   [
 *     'src/0002_bring_up/docs/0003_bring_up/docs/0071_typescript_declare.md',
 *     'src/0002_bring_up/docs/0003_bring_up/',
 *     'docs/0003_bring_up/',
 *     'docs',
 *     '0003',
 *     'bring_up',
 *     'docs',
 *     '0071',
 *     'typescript_declare',
 *     index: 0,
 *     input: 'src/0002_bring_up/docs/0003_bring_up/docs/0071_typescript_declare.md',
 *     groups: undefined
 *   ]
 * 
 * * readme
 *   [
 *     'src/0002_bring_up/docs/0003_bring_up/README.md',
 *     'src/0002_bring_up/docs/0003_bring_up/',
 *     'docs/0003_bring_up/',
 *     'docs',
 *     '0003',
 *     'bring_up',
 *     'README.md',
 *     index: 0,
 *     input: 'src/0002_bring_up/docs/0003_bring_up/README.md',
 *     groups: undefined
 *   ]
 */
let projectPathInfoEnum = {
    prefixPathIndex: 1,
    subPathIndex: 6,
    subRelativePathIndex: 6,
    subSrcIndex: 7,
    readmePrefixPathIndex: 1,
    readmeSubPathIndex: 2,
    readmeSubSrcIndex: 3,
};

/**
 * 
 * @param {workspaceFolder[]} workspaceFolders 
 * @param {string} filePath 
 * @returns {string}
 */
function parsePath(workspaceFolders, filePath) {
    let workspaceFolderFlag = false
    let pathType = projectPathTypeEnum.none
    let subPath = ""
    let subFileRelativePath = ""
    let subSrcPath = ""
    let mainPath = ""

    workspaceFolders.forEach(workspaceFolder => {
        // console.log(workspaceFolder.url.path)
        // console.log(path)
        if (filePath.includes(workspaceFolder.url.path)) {
            let projectRelativePath = filePath.replace(workspaceFolder.url.path, "").replace(/^\/*/, "")
            let projectDirPathInfo = new RegExp("((([^./]*)/(\\d{0,4})_([^./]*)/)*)(([^./]*)/(\\d{0,4})_([^./]*))/?([^./]*)?/?([^./]*)?$")
            let projectFilePathInfo = new RegExp("((([^./]*)/(\\d{0,4})_([^/]*)/)*)(([^./]+)/(images|refers)?/?(\\d{0,4}_[^/]*))$")
            let projectReadmePathInfo = new RegExp("((([^./]*)/(\\d{0,4})_([^/]*)/)*)([^./]*\.md)$")
            // console.log(projectRelativePath)

            let matchValue = projectDirPathInfo.exec(projectRelativePath)
            if (matchValue != null) {
                /**
                 * [
                 *   'src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up/docs/refers',
                 *   'src/0002_bring_up/docs/0003_bring_up/',
                 *   'docs/0003_bring_up/',
                 *   'docs',
                 *   '0003',
                 *   'bring_up',
                 *   'docs/0004_bring_up',
                 *   'docs',
                 *   '0004',
                 *   'bring_up',
                 *   'docs',
                 *   'refers',
                 *   index: 0,
                 *   input: 'src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up/docs/refers',
                 *   groups: undefined
                 * ]
                 */

                pathType = projectPathTypeEnum.dir
                subPath = matchValue[projectPathInfoEnum.prefixPathIndex] + matchValue[projectPathInfoEnum.subPathIndex]
            } else if((matchValue = projectFilePathInfo.exec(projectRelativePath)) !== null) {
                /**
                 * [
                 *   'src/0002_bring_up/docs/0003_bring_up/src/images/0071_typescript_declare.png',
                 *   'src/0002_bring_up/docs/0003_bring_up/',
                 *   'docs/0003_bring_up/',
                 *   'docs',
                 *   '0003',
                 *   'bring_up',
                 *   'src/images/0071_typescript_declare.png',
                 *   'src',
                 *   'images',
                 *   '0071_typescript_declare.png',
                 *   index: 0,
                 *   input: 'src/0002_bring_up/docs/0003_bring_up/src/images/0071_typescript_declare.png',
                 *   groups: undefined
                 * ]
                 */
                
                pathType = projectPathTypeEnum.file
                subPath = matchValue[projectPathInfoEnum.prefixPathIndex]
                subSrcPath = matchValue[projectPathInfoEnum.subSrcIndex]
                subFileRelativePath = matchValue[projectPathInfoEnum.subRelativePathIndex]
            } else if ((matchValue = projectReadmePathInfo.exec(projectRelativePath)) != null) {
                /**
                 * [
                 *   'src/0002_bring_up/README.md',
                 *   'src/0002_bring_up/',
                 *   'src/0002_bring_up/',
                 *   'src',
                 *   '0002',
                 *   'bring_up',
                 *   'README.md',
                 *   index: 0,
                 *   input: 'src/0002_bring_up/README.md',
                 *   groups: undefined
                 * ]
                 */
                
                pathType = projectPathTypeEnum.readme
                if (matchValue[projectPathInfoEnum.readmePrefixPathIndex].length == 0 
                        && matchValue[projectPathInfoEnum.readmeSubPathIndex] == undefined) {
                    mainPath = matchValue[projectPathInfoEnum.readmePrefixPathIndex]
                } else {
                    mainPath = matchValue[projectPathInfoEnum.readmePrefixPathIndex].replace(matchValue[projectPathInfoEnum.readmeSubPathIndex], "")
                    subPath = matchValue[projectPathInfoEnum.readmePrefixPathIndex]
                    subSrcPath = matchValue[projectPathInfoEnum.readmeSubSrcIndex]
                }
            }

            // console.log("workspace project path match value: " + matchValue)
            console.log(matchValue)
            workspaceFolderFlag = true
        }
    });

    return {
                "status": workspaceFolderFlag, 
                "pathType": pathType, 
                "mainPath": mainPath,
                "subPath": subPath,
                "subrelativePath": subFileRelativePath,
                "subSrcPath": subSrcPath,
            }
}

let boundaryArray = ["```"]

/**
 * 
 * @param {string} lineText 
 */
function isTextBlockBoundary(lineText) {
    let foundBoundary = false

    if (lineText.trim().length == 0)
        return true

    boundaryArray.forEach(e => {
        if (lineText.trim().startsWith(e))
            foundBoundary = true
    })

    return foundBoundary
}

let projectTextBlockTypeEnum = {
    none: 0,
    file: 1,
    list: 2,
    table: 3,
    plantuml: 4,
    indent: 5,
};


/**
 * 
 * @param {string[]} textBlock 
 * @param {string} rootPath 
 * @param {int} cursor 
 * @returns {int}
 */
function parseTextBlock(textBlock, rootPath, cursor) {

    let statusFlag = false
    let checkOutput
    let type = projectTextBlockTypeEnum.none

    if (checkOuput = listjs.isList(textBlock, rootPath, cursor)) {
        type = projectTextBlockTypeEnum.list
        console.log("parseTextBlock found list")
    } else if (checkOuput = indentjs.isIndent(textBlock, rootPath, cursor)) {
        type = projectTextBlockTypeEnum.indent
        console.log("parseTextBlock found indent")
    } else if (checkOuput = plantumljs.isPlantuml(textBlock, rootPath, cursor)) {
        type = projectTextBlockTypeEnum.plantuml
        console.log("parseTextBlock found plantuml")
    } else if (checkOuput = tablejs.isTable(textBlock, rootPath, cursor)) {
        type = projectTextBlockTypeEnum.table
        console.log("parseTextBlock found table")
    } else {
        console.log("parseTextBlock not found any type")
    }

    if (type != projectTextBlockTypeEnum.none)
        statusFlag = true

    return {"status": statusFlag, "type": type}
}

module.exports = {
    newProject,
    newSubProject,
    newSubProjectWorkFile,
    getRootPath,
    parsePath,
    projectPathTypeEnum,
    parseTextBlock,
    isTextBlockBoundary,
    projectTextBlockTypeEnum,
}
