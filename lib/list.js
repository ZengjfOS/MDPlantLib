const path = require("path")

/**
 * 
 * @param {string} lineText
 * @returns {string}
 */
function convert2List(lineText) {
    let outputString = ""
    let imageSubfixArray = ['.xbm','.tif','.pjp','.svgz','.jpg','.jpeg','.ico','.tiff','.gif','.svg','.jfif','.webp','.png','.bmp','.pjpeg','.avif']
    let spaceString = lineText.substring(0, lineText.search(/\S/))
    let subfix = lineText.substring(lineText.lastIndexOf(".") + 1, lineText.length).toLowerCase();

    if (lineText.length <= 0)
        return outputString;

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
            let lineTextSplit = lineText.split(" http");

            if (lineTextSplit.length = 2)
                outputString = spaceString + "* [" + lineTextSplit[0].trim() + "](http" + lineTextSplit[1].trim() + ")"
        } else {
            if (imageSubfixArray.includes("." + subfix))
                outputString = spaceString + "![" + path.basename(lineText) + "](" + (lineText).replace(/ /g, "%20") + ")"
            else
                outputString = spaceString + "* [" + path.basename(lineText) + "](" + (lineText).replace(/ /g, "%20") + ")"
        }
    }

    console.log(lineText + " --> " + outputString);

    return outputString
}

/**
 * 
 * @param {string[]} textBlock 
 * @param {string} rootPath 
 * @param {int} cursor 
 * @returns {int}
 */
function isList(textBlock, rootPath, cursor) {
    let found = false
    let fileRE = new RegExp("(^([^./\\s]*/)*\\d{0,4})_[^./]*\\.[^./]*$", "g")
    let listRE = new RegExp("(^\\* |!)\\[(.*)\\]\\((.*)\\)$", "g")
    let matchValue

    if (textBlock[cursor].trim().length == 0)
        return found

    /*
    matchValue = fileRE.exec(lineText.trim())
    if (matchValue != null) {
        console.log(matchValue)
        fileFlag = true
        statusFlag = true
    }

    matchValue = listRE.exec(lineText.trim())
    if (matchValue != null) {
        console.log(matchValue)
        listFlag = true
        statusFlag = true
    }
    */

    // todo

    found = true

    return found
}

module.exports = {
    convert2List,
    isList,
}
