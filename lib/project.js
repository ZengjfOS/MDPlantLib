const fs = require("fs")
const fse = require('fs-extra')
const path = require("path")

const indentjs = require('./indent.js')
const tablejs = require('./table.js')
const plantumljs = require('./plantuml.js')
const listjs = require('./list.js')
const menujs = require('./menu.js')
const loggerjs = require("./logger")

const logger = new loggerjs.Logger("project")

/**
 * 
 * @param {string} outputDir 
 * @param {string} author 
 * @returns {boolean}
 */
function newProject(outputDir, author) {
    let files = fs.readdirSync(outputDir)

    if (files.filter(e => e != ".git").length == 0) {
        fse.copySync(__dirname + "/res/mainProjectTemplate", outputDir)

        // custom conf.py
        const fileContent = fs.readFileSync(outputDir + "/conf.py.template", 'utf8').split(/\r?\n/)
        let confFile = fs.createWriteStream(outputDir + "/conf.py")
        for (let i = 0; i < fileContent.length; i++) {
            let line = fileContent[i]
            if (line.startsWith("author = ")) {
                line = "author = '" + author + "'"
                fileContent[i] = line
            }
            confFile.write(line + "\n")
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

    logger.debug("new subproject at: " + subProjectDir)

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

    logger.debug(outputFile)

    let fileContent = "# " + fileName.replace(/^\d{1,4}_/, "").split(".")[0].replace(/_/gi, " ") + "\n"
    fileContent += "\n"
    fileContent += "一行摘要简介...\n"
    fileContent += "\n"
    fileContent += "# 说明\n"
    fileContent += "\n"
    fileContent += "* 思考\n"
    fileContent += "* 思考\n"
    fileContent += "* 思考\n"

    fs.writeFileSync(outputFile, fileContent)
}

let projectPathTypeEnum = {
    none: 0,
    dir: 1,
    file: 2,
    readme: 3,
}

/**
 * * dir
 *   ```
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
 *   ```
 * * file
 *   ```
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
 *   ```
 * * readme
 *   ```
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
 *   ```
 */
let projectPathInfoEnum = {
    prefixPathIndex: 1,
    dirSubPathIndex: 6,
    dirSubSrcIndex: 10,
    fileSubRelativePathIndex: 6,
    fileSubSrcIndex: 7,
    readmePrefixPathIndex: 1,
    readmeSubPathIndex: 2,
    readmeSubSrcIndex: 3,
}

/**
 * * dir
 *   * mainPath
 *   * subPath
 *   * subSrcPath
 * * file
 *   * subPath
 *   * subSrcPath
 *   * subFileRelativePath
 * * readme
 *   * mainPath
 *   * subPath
 *   * subSrcPath
 * 
 * @param {string} rootPath 
 * @param {string} filePath 
 * @returns 
 */
function parsePath(rootPath, filePath) {
    let workspaceFolderFlag = false
    let pathType = projectPathTypeEnum.none
    let subPath = ""
    let subFileRelativePath = ""
    let subSrcPath = ""
    let mainPath = ""

    // logger.debug(rootPath)
    if (filePath.includes(rootPath)) {
        let projectRelativePath = filePath.replace(rootPath, "").replace(/\\/gi, "/").replace(/^\/*/, "")
        let projectDirPathInfo = new RegExp("((([^./]*)/(\\d{0,4})_([^./]*)/)*)(([^./]*)/(\\d{0,4})_([^./]*))/?([^./]*)?/?([^./]*)?$")
        let projectFilePathInfo = new RegExp("((([^./]*)/(\\d{0,4})_([^/]*)/)*)(([^./]+)/(images|refers)?/?(\\d{0,4}_[^/]*))$")
        let projectReadmePathInfo = new RegExp("((([^./]*)/(\\d{0,4})_([^/]*)/)*)([^./]*\.md)$")
        // logger.debug(projectRelativePath)

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
            mainPath = matchValue[projectPathInfoEnum.prefixPathIndex]
            subPath = matchValue[projectPathInfoEnum.prefixPathIndex] + matchValue[projectPathInfoEnum.dirSubPathIndex]
            if (matchValue[projectPathInfoEnum.dirSubSrcIndex])
                subSrcPath = matchValue[projectPathInfoEnum.dirSubSrcIndex]
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
            subSrcPath = matchValue[projectPathInfoEnum.fileSubSrcIndex]
            subFileRelativePath = matchValue[projectPathInfoEnum.fileSubRelativePathIndex]
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

        // logger.debug("workspace project path match value: " + matchValue)
        logger.debug(matchValue)
        workspaceFolderFlag = true
    }

    return {
                "status": workspaceFolderFlag, 
                "pathType": pathType, 
                "mainPath": mainPath,
                "subPath": subPath,
                "subrelativePath": subFileRelativePath,
                "subSrcPath": subSrcPath,
            }
}

let projectTextBlockTypeEnum = {
    none: 0,
    menu: 1,
    list: 2,
    table: 3,
    plantuml: 4,
    indent: 5,
}

/**
 * 
 * @param {string[]} textBlock 
 * @param {string} rootPath 
 * @param {number} cursorOffset 
 * @returns 
 */
function parseTextBlock(textBlock, rootPath, cursorOffset) {

    let status = false
    let type = projectTextBlockTypeEnum.none
    let content = ""

    for (let i = 0; i < textBlock.length; i++)  {
        textBlock[i] = textBlock[i].replace(/\\/gi, "/")
    }

    logger.debug(textBlock)
    logger.debug("cursor offset: " + cursorOffset)

    if (textBlock.length >= (cursorOffset + 1) && cursorOffset >= 0) {
        if ((checkOutput = indentjs.isIndent(textBlock, rootPath, cursorOffset)).status) {
            type = projectTextBlockTypeEnum.indent
            logger.debug("parseTextBlock found indent")
        } else if ((checkOutput = plantumljs.isPlantuml(textBlock, rootPath, cursorOffset)).status) {
            type = projectTextBlockTypeEnum.plantuml
            logger.debug("parseTextBlock found plantuml")
        } else if ((checkOutput = tablejs.isTable(textBlock, rootPath, cursorOffset)).status) {
            type = projectTextBlockTypeEnum.table
            logger.debug("parseTextBlock found table")
        } else if ((checkOutput = menujs.isMenu(textBlock, rootPath, cursorOffset)).status) {
            type = projectTextBlockTypeEnum.menu
            logger.debug("parseTextBlock found menu")
        } else if ((checkOutput = listjs.isList(textBlock, rootPath, cursorOffset)).status) {
            type = projectTextBlockTypeEnum.list
            logger.debug("parseTextBlock found list")
        } else {
            logger.debug("parseTextBlock not found any type")
        }
    } else {
        logger.debug("cursor offset: " + cursorOffset + " is larger than text block length: " + textBlock.length)
    }

    if (type != projectTextBlockTypeEnum.none) {
        logger.debug(checkOutput)

        status = true
        content = checkOutput.content
    } 

    return {"status": status, "type": type, "content": content}
}

module.exports = {
    newProject,
    newSubProject,
    newSubProjectWorkFile,
    parsePath,
    projectPathTypeEnum,
    parseTextBlock,
    projectTextBlockTypeEnum,
}
