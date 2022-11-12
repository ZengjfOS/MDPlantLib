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
 * @returns 
 */
function isList(textBlock, rootPath, cursor) {
    let found = false
    let fileRE = new RegExp("(^([^./\\s]*/)*\\d{0,4})_[^./]*\\.[^./]*$", "g")
    let titleWithFileRE = new RegExp("^(.*)+\s+([^./\\s]*/)*\\d{0,4}_[^./]*\\.[^./]*$", "g")
    let listRE = new RegExp("(^\\* |!)\\[(.*)\\]\\((.*)\\)$", "g")
    let matchValue

    if (textBlock[cursor].trim().length == 0)
        return found

    if ((matchValue = fileRE.exec(textBlock[cursor].trim()))) {
        // docs/0002_unit_test.md
        console.log("list match file")
        found = true
    } else if ((matchValue = listRE.exec(textBlock[cursor].trim()))) {
        // * [0002_unit_test.md](/docs/0002_unit_test.md)
        // ![0002_unit_test.png](/docs/0002_unit_test.png)

        console.log("list match markdown format list")
        found = true
    } else if (textBlock[cursor].trim().includes(" http")) {
        // zengjf http://zengjf.fun
        console.log("list match http")
        found = true
    } else if ((matchValue = titleWithFileRE.exec(textBlock[cursor].trim()))) {
        // zengjf docs/0002_unit_test.md

        // table test/refers/0004_table.json
        let tableRE = new RegExp("^table[\\s:]*((\\d*)[x\\s*]*(\\d*)|([\\w\\/]*\\.json))$", "g")
        if (tableRE.exec(textBlock[cursor].trim())) {
            console.log("list skip match table")
        } else {
            console.log("list match title with file")
            found = true
        }
    }

    if (found)
        return {"status": found, "info": ""}
    else
        return null
}

module.exports = {
    convert2List,
    isList,
}
