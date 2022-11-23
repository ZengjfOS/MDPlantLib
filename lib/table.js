const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')
const loggerjs = require("./logger")

const logger = new loggerjs.Logger("project")

function fileAbstract(fileContentArr) {
    let startAbstract = false

    for (let i = 0; i < fileContentArr.length; i++) {
        let element = fileContentArr[i].trim()

        if (element.startsWith("# ") && (startAbstract == false)) {
            startAbstract = true
            continue
        }

        if (startAbstract) {
            if (element.length > 0) {
                if (element.startsWith("#"))
                    return "Empty Abstract"
                else
                    return element
            }
        }
    }

    return "Empty Abstract"
}

/**
 * 
 * @param {string | null | undefined} outputFile 
 * @param {string} subProjectDocsDir 
 * @returns 
 */
function refreshReadmeDocsTable(outputFile, subProjectDocsDir) {

    if (subProjectDocsDir == undefined || subProjectDocsDir == null)
        return {"status": true, "content": ""}

    logger.debug("refresh readme: " + subProjectDocsDir)

    let subProjectDocsDirName = path.basename(subProjectDocsDir)
    let subProjectIndexRegex = new RegExp("^(\\d{0,4})_")
    let outputString = "NO.  |文件名称|摘要\n"
    outputString += ":---:|:--|:--\n"
    let outputStringArray = []

    let dirs = fs.readdirSync(subProjectDocsDir)
    dirs.forEach((dir) => {
        let dirFlag = false
        let subProjectWorkFile = ""

        if (fs.lstatSync(subProjectDocsDir + "/" + dir).isDirectory()) {
            subProjectWorkFile = subProjectDocsDir + "/" + dir + "/README.md"

            dirFlag = true
        } else {
            subProjectWorkFile = subProjectDocsDir + "/" + dir
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
                    outputStringArray.push(subPorjectIndex + " | [" + dir.toString().split(subPorjectIndex + "_").join("") + "](" + (subProjectDocsDirName + "/" + dir + "/README.md").replace(/ /g, "%20") + ") | " + fabs)
                else
                    outputStringArray.push(subPorjectIndex + " | [" + dir.toString().split(subPorjectIndex + "_").join("").split("\.md").join("") + "](" + (subProjectDocsDirName + "/" + dir).replace(/ /g, "%20") + ") | " + fabs)
            }
        }
    })

    outputString += outputStringArray.reverse().join("\n")

    if (outputFile != undefined || outputFile != null) {
        const fileContent = fs.readFileSync(outputFile, 'utf8').split(/\r?\n/)
        var outFile = fs.createWriteStream(outputFile)
        var docsFlag = false

        for (let row = 0; row < fileContent.length; row++) {
            // 写入docs部分
            if (fileContent[row].startsWith("#") && fileContent[row].includes("# docs")) {
                outFile.write(fileContent[row] + "\n\n")
                outFile.write(outputString + "\n")

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

    return {"status": true, "content": outputString}
}

/**
 * 
 * @param {string} rootPath 
 * @param {string} relativePath 
 * @param {string} suffix
 * @returns 
 */
function generateIndexTable(rootPath, relativePath, suffix="") {

    logger.debug("generate index table: " + rootPath + "/" + relativePath)

    let subProjectIndexRegex = new RegExp("^(\\d{0,4})_")
    let outputString = "NO.  |文件名称\n"
    outputString += ":---:|:--\n"
    let outputStringArray = []
    let subProjectDocsDir = rootPath + "/" + relativePath

    let dirs = fs.readdirSync(subProjectDocsDir)
    dirs.forEach((dir) => {
        let subProjectWorkFile = subProjectDocsDir + "/" + dir

        if ((suffix.length != 0) && (!subProjectWorkFile.endsWith(suffix)))
            return

        // just for file
        if (!fs.lstatSync(subProjectWorkFile).isDirectory()) {
            if (fs.existsSync(subProjectWorkFile)) {
                let indexMatch = subProjectIndexRegex.exec(dir.toString())
                if (indexMatch) {
                    let subPorjectIndex = indexMatch[1]

                    outputStringArray.push(subPorjectIndex + " | [" + dir.toString().split(subPorjectIndex + "_").join("") + "](" + (relativePath+ "/" + dir).replace(/ /g, "%20") + ")")
                }
            }
        }
    })

    outputString += outputStringArray.reverse().join("\n")

    return {"status": true, "content": outputString}
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
 * @returns 
 */
function convertJSON2Table(configPath, table) {
    let outputStringArray = []
    let splitString = " | "
    let tableEntry = {}
    let maxColume = 0

    try {
        const data = fs.readFileSync(configPath, 'utf8')

        // parse JSON string to JSON object
        const config = JSON.parse(data)
        tableEntry = eval('config.' + table)
    } catch (err) {
        logger.debug(`Error reading file from disk: ${err}`)

        return {"status": false, "content": ""}
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
        outputStringArray.push(rowString.join(splitString))

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

            outputStringArray.push(rowString.join(splitString))
            countRow++
        })

        let titleLengthIndex = outputStringArray[0].split(splitString).length - 1
        rowString = []
        for (i = 0; i < maxColume; i ++) {
            rowString.push("-----")

            if (titleLengthIndex < i)
                outputStringArray[0] += splitString + "empty"
        }
        outputStringArray.splice(1, 0, rowString.join(splitString.trim()))
    }
    
    return {"status": true, "content": outputStringArray.join("\n")}
}

/**
 * 
 * @param {string} configPath 
 * @returns 
 */
function convertExcel2Table(configPath) {
    let outputString = []
    let splitString = " | "
    let workSheetsFromFile

    try {
        workSheetsFromFile = xlsx.parse(configPath);
    } catch (err) {
        logger.debug(`Error reading file from disk: ${err}`)

        return {"status": false, "content": ""}
    }

    workSheetsFromFile.forEach(sheet => {
        rows = sheet.data
        if (rows.length == 0)
            return

        let workSheet = []
        let countColume = 0
        let countRow = 0
        let maxColume = 0
        let rowString 
        rows.forEach(row => {
            if (row.length == 0)
                return

            rowString = []
            countColume = 0
            row.forEach(element => {
                if (typeof(element) == "string") {
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
                } else {
                    rowString.push(element)
                }

                countColume++
            })

            workSheet.push(rowString.join(splitString))

            countRow++

            if (maxColume < countColume)
                maxColume = countColume
        })
        let titleLengthIndex = workSheet[0].split(splitString).length - 1
        rowString = []
        for (i = 0; i < maxColume; i ++) {
            rowString.push("-----")

            if (titleLengthIndex < i)
                workSheets[0] += splitString + "empty"
        }
        workSheet.splice(1, 0, rowString.join(splitString.trim()))

        outputString.push(workSheet.join("\n"))
    })

    return {"status": true, "content": outputString.join("\n\n")}
}

/**
 * 
 * @param {string} configPath 
 * @returns 
 */
function convertCSV2Table(configPath) {
    let outputString = []
    let splitString = " | "
    let data

    try {
        data = fs.readFileSync(configPath, 'utf8')
    } catch (err) {
        logger.debug(`Error reading file from disk: ${err}`)

        return {"status": false, "content": ""}
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

    return {"status": true, "content": outputString.join("\n")}
}

/**
 * 
 * @param {string} lineValue 
 * @returns 
 */
function convertRowColume2Table(lineValue) {
    let tableRegex = new RegExp("\\s*table[\\s:]*(\\d*)[x\\s*]*(\\d*)\\s*")
    let outputString = ""
    let status = false

    let tableMatchValue = tableRegex.exec(lineValue)
    if (tableMatchValue != null) {
        let rows = Number(tableMatchValue[1])
        let cols = Number(tableMatchValue[2])

        for (let row = 0; row < rows + 2; row++) {
            for (let col = 0; col < cols; col++) {
                if (row == 0) {
                    if (col == 0) {
                        outputString += "NO.  "
                    } else {
                        outputString += "col " + (col + 1)
                    }

                    if (col != (cols - 1)) {
                        outputString += " | "
                    }
                }

                if (row == 1) {
                    outputString += "-----"

                    if (col != (cols - 1)) {
                        outputString += "-|-"
                    }
                }

                if (row > 1) {

                    if (col == 0) {
                        outputString += (" " + ((row - 2) + 1)).padEnd(5, ' ')
                    } else {
                        outputString += "     "
                    }

                    if (col != (cols - 1)) {
                        outputString += " | "
                    }
                }
            }

            if (row != (rows + 2 - 1))
                outputString += "\n"
        }

        status = true
    }

    return {"status": status, "content": outputString}
}

/**
 * 
 * @param {string} lineValue 
 * @param {string} rootPath 
 * @returns 
 */
function convert2Table(lineValue, rootPath) {
    let tableRowColumeRegex = new RegExp("\\s*table[\\s:]*(\\d*)[x\\s*]*(\\d*)\\s*", "g")
    let tableRegex = new RegExp("\\s*table[\\s:]*([\\w\\/]*\\.(json|csv|xlsx|xls))", "g")

    let tableMatchValue = tableRowColumeRegex.exec(lineValue)
    if (tableMatchValue != null && tableMatchValue[1].length != 0 && tableMatchValue[2].length != 0) {
        // logger.debug("row colume: " + tableMatchValue)
        return convertRowColume2Table(lineValue)
    }

    tableMatchValue = tableRegex.exec(lineValue)
    if (tableMatchValue != null) {
        // logger.debug("json: " + tableMatchValue)
        if (tableMatchValue[2] == "json")
            return convertJSON2Table(rootPath + "/" + tableMatchValue[1], "table")
        else if (tableMatchValue[2] == "csv")
            return convertCSV2Table(rootPath + "/" + tableMatchValue[1])
        else if (tableMatchValue[2] == "xlsx" || tableMatchValue[2] == "xls")
            return convertExcel2Table(rootPath + "/" + tableMatchValue[1])
    }

    return {"status": false, "content": ""}
}

/**
 * 
 * @param {string[]} textBlock 
 * @param {string} rootPath 
 * @param {number} cursorOffset 
 * @returns 
 */
function isTable(textBlock, rootPath, cursorOffset) {
    let found = false
    let content = ""
    let matchValue
    // let tableRE = new RegExp("^table[\\s:]*((\\d*)[x\\s*]*(\\d*)|([\\w\\/]*\\.(json|csv|xlsx|xls)))$", "g")
    let tableRE = new RegExp("\\s*(table[\\s:]*([\\w\\/]*\\.(json|csv|xlsx|xls)?))", "g")
    let tableRowColumeRegex = new RegExp("\\s*(table[\\s:]*(\\d*)[x\\s*]*(\\d*))\\s*", "g")

    logger.debug("enter isTable")

    if (textBlock[cursorOffset].trim().length == 0)
        return {"status": false, "content": content}

    let startLine = 0
    for (let i = 0; i < textBlock.length; i++) {
        if (textBlock[i].trim().length != 0) {
            startLine = i
            break
        }
    }

    if (textBlock[startLine].trim().replace(/\s*/gi, "") == "NO.|文件名称|摘要") {
        logger.debug("table for docs found")
        found = true
        content = "docs"
    }else if (textBlock[startLine].trim().replace(/\s*/gi, "") == "NO.|文件名称") {
        logger.debug("table for index found")
        found = true
        content = "index"
    } else if ((matchValue = tableRE.exec(textBlock[cursorOffset].trim()))
            || (matchValue = tableRowColumeRegex.exec(textBlock[cursorOffset].trim()))){
        logger.debug("table cmd found")
        found = true
        content = matchValue[1]
    } else if ((matchValue = tableRE.exec(textBlock[startLine].trim()))
            || (matchValue = tableRowColumeRegex.exec(textBlock[startLine].trim()))) {
        logger.debug("table found")
        found = true
        content = matchValue[1]
    }

    return {"status": found, "content": content}
}

module.exports = {
    refreshReadmeDocsTable,
    convertJSON2Table,
    convertExcel2Table,
    convertRowColume2Table,
    convert2Table,
    isTable,
    generateIndexTable,
}
