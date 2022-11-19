const path = require("path")
const loggerjs = require("./logger")

const logger = new loggerjs.Logger("list")

/**
 * 
 * @param {string} lineText
 * @returns {string}
 */
function convert2List(lineText) {
    let outputString = ""
    let imageSuffixArray = ['.xbm','.tif','.pjp','.svgz','.jpg','.jpeg','.ico','.tiff','.gif','.svg','.jfif','.webp','.png','.bmp','.pjpeg','.avif']
    let spaceString = lineText.substring(0, lineText.search(/\S/))
    let suffix = lineText.substring(lineText.lastIndexOf(".") + 1, lineText.length).toLowerCase()

    if (lineText.length <= 0)
        return outputString

    // revert string
    if (lineText.startsWith("* ") || lineText.startsWith("![")) {
        if (lineText.indexOf("(") > -1 && lineText.indexOf(")") > -1) {
            if (lineText.indexOf("http") > -1) {
                outputString = spaceString + lineText.split("[")[1].split("]")[0] + " " + lineText.split("(")[1].split(")")[0]
            } else {
                let showString = lineText.split("(")[1].split(")")[0].replace(/%20/g, " ")
                if (!showString.startsWith("/"))
                    outputString = spaceString + showString
                else
                    outputString = spaceString + showString.replace("/", "")
            }
        }
    } else {
        if (lineText.indexOf("http") > 0) {
            let lineTextSplit = lineText.split(" http")

            if (lineTextSplit.length = 2)
                outputString = spaceString + "* [" + lineTextSplit[0].trim() + "](http" + lineTextSplit[1].trim() + ")"
        } else {
            if (imageSuffixArray.includes("." + suffix))
                outputString = spaceString + "![" + path.basename(lineText) + "](" + (lineText).replace(/ /g, "%20") + ")"
            else
                outputString = spaceString + "* [" + path.basename(lineText) + "](" + (lineText).replace(/ /g, "%20") + ")"
        }
    }

    logger.info(lineText + " --> " + outputString)

    return outputString
}

/**
 * 
 * @param {string[]} textBlock 
 * @param {string} rootPath 
 * @param {number} cursorOffset 
 * @returns 
 */
function isList(textBlock, rootPath, cursorOffset) {
    let fileRE = new RegExp("^\\/?([^\\./\\s]*/)*([^\\.\\/]*\\.[^\\.\\/]*)$", "g")
    let titleWithFileRE = new RegExp("^(.+)\\s+([^\\/ ]*/)*\\d{0,4}_([^\\.\\/]*)", "g")
    let listRE = new RegExp("^(^\\* |!)\\[(.*)\\]\\((.*)\\)$", "g")
    let found = false
    let matchValue

    logger.info("enter isList")

    if (textBlock.length < (cursorOffset + 1) || cursorOffset < 0)
        return {"status": found, "error": true, "info": "error with cursorOffset: " + cursorOffset}

    let lineText = textBlock[cursorOffset].trim()
    logger.info("listText: " + lineText)
    if (lineText.length != 0) {
        if ((matchValue = fileRE.exec(lineText))) {
            // docs/0002_unit_test.md
            logger.info("list match file")
            found = true
        } else if ((matchValue = listRE.exec(lineText))) {
            // * [0002_unit_test.md](/docs/0002_unit_test.md)
            // ![0002_unit_test.png](/docs/0002_unit_test.png)

            logger.info("list match markdown format list")
            found = true
        } else if (lineText.includes(" http")) {
            // zengjf http://zengjf.fun
            logger.info("list match http")
            found = true
        } else if ((matchValue = titleWithFileRE.exec(lineText))) {
            // zengjf docs/0002_unit_test.md

            // table test/refers/0004_table.json
            let tableRE = new RegExp("^table[\\s:]*((\\d*)[x\\s*]*(\\d*)|([\\w\\/]*\\.json))$", "g")
            if (tableRE.exec(textBlock[cursorOffset].trim())) {
                logger.info("list skip match table")
            } else {
                logger.info("list match title with file")
                found = true
            }
        }
    }

    return {"status": found, "error": false, "info": ""}
}

module.exports = {
    convert2List,
    isList,
}
