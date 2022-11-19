const loggerjs = require("./logger")

const logger = new loggerjs.Logger("menu")

/**
 * 
 * @param {string[]} contentArray 
 * @returns {string[]}
 */
function generateMenu(contentArray) {
    let menus = []

    for (let i = 0; i < contentArray.length; i++) {
        if (contentArray[i].trim().startsWith("#") && (contentArray[i].trim().toLowerCase().indexOf("menu") >= 0
                || contentArray[i].trim().toLowerCase().indexOf("目录") >= 0))
            continue

        let matchValue
        let fileRE = new RegExp("^(#{1,}) ", "g")
        if (matchValue = fileRE.exec(contentArray[i].trim())) {
            if ((i > 0 && contentArray[i - 1].trim().length == 0) && ((i < (contentArray.length - 1)) && contentArray[i + 1].trim().length == 0)) {
                let prefix = matchValue[1].replace(/^#/, "").replace(/#/g, "  "); 
                let content = contentArray[i].substring(contentArray[i].lastIndexOf("#") + 1).trim()
                var chinese_reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g
                menus.push(prefix + "* [" + content + "](#" + content.replace(/ /g, "-").replace(chinese_reg, "").replace(/[\\'!"#$%&()*+,.\/:;<=>?@\[\]^_`{|}~]/g, "") + ")")
            }
        }
    }

    return menus
}

/**
 * 
 * @param {string[]} textBlock 
 * @param {string} rootPath 
 * @param {number} cursorOffset 
 * @returns 
 */
function isMenu(textBlock, rootPath, cursorOffset) {
    let found = false
    let type = ""

    logger.info("enter isMenu")

    let startLine = 0
    for (let i = 0; i < textBlock.length; i++) {
        if (textBlock[i].trim().length != 0) {
            startLine = i
            break
        }
    }

    if (textBlock[startLine].trim().includes("](#")) {
        logger.info("menu block found")
        found = true
    }

    return {"status": found, "error": false, "info": type}
}

module.exports = {
    generateMenu,
    isMenu
}
