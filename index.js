// 主要功能函数入口
 
const indentjs = require('./lib/indent.js')
const tablejs = require('./lib/table.js')
const plantumljs = require('./lib/plantuml.js')
const pastejs = require('./lib/paste.js')
const listjs = require('./lib/list.js')

function convert2Tree(contentArray, skipLevel) {
    indentjs.listToTreeWithSkip(0, 0, contentArray.length, contentArray, 2, false, skipLevel)
}

function revert2ListIndent(contentArray, skipLevel) {
    indentjs.treeToListWithSkip(contentArray, false, 2, skipLevel)
}

function convert2Table(line) {
    return tablejs.convert2Table(line)
}

function convert2SequenceDiagram(contentArray, skipLevel) {
    plantumljs.listToSequenceDiagramWithSkip(0, 0, contentArray.length, contentArray, 2, false, skipLevel)

    for (let i = 1; i < contentArray.length; i++) {
        let filePathRegex = new RegExp("([^/ ]+.(c|h|cpp|java|py|rc))\\s*$", "g")
        let tableMatchValue = filePathRegex.exec(contentArray[i])
        if (tableMatchValue != null && tableMatchValue[1].length != 0) {
            continue
        } else {
            contentArray[i] = contentArray[i].replace(/<<enterspace_start>>/g, "").replace(/<<enterspace_end>>/g, "\n").trim()
        }
    }

    let outputArray = contentArray.join("\n").split("\n")
    for (let i = 1; i < outputArray.length; i++) {
       outputArray[i] = outputArray[i].trim()
    }

    return outputArray
}

function saveClipboardImage(imagePath, cb) {
    pastejs.saveClipboardImageToFileAndGetPath(imagePath, cb)
}

function convert2List(lineText) {
    return listjs.convert2List(lineText)
}
 
// 向外输入格式转换函数
module.exports = {
    convert2SequenceDiagram,
    convert2Table,
    convert2Tree,
    revert2ListIndent,
    saveClipboardImage,
    convert2List,
}
