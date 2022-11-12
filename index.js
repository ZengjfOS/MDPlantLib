// 主要功能函数入口
 
const indentjs = require('./lib/indent.js')
const tablejs = require('./lib/table.js')
const plantumljs = require('./lib/plantuml.js')
const pastejs = require('./lib/paste.js')
const listjs = require('./lib/list.js')
const projectjs = require('./lib/project.js')

// 向外输入格式转换函数
module.exports = {
    // lib/mdplant.js
    convert2SequenceDiagram: plantumljs.convert2SequenceDiagram,

    // lib/table.js
    convert2Table: tablejs.convert2Table,
    refreshReadme: tablejs.refreshReadme,

    // lib/indent.js
    convert2Tree: indentjs.convert2Tree,
    revert2Tree: indentjs.revert2Tree,

    // lib/paste.js
    saveClipboardImage: pastejs.saveClipboardImage,

    // lib/list.js
    convert2List: listjs.convert2List,

    // lib/project.js
    projectPathTypeEnum: projectjs.projectPathTypeEnum,
    newSubProjectWorkFile: projectjs.newSubProjectWorkFile,
    newSubProject: projectjs.newSubProject,
    newProject: projectjs.newProject,
    parsePath: projectjs.parsePath,
    parseTextBlock: projectjs.parseTextBlock,
    getRootPath: projectjs.getRootPath,
    isTextBlockBoundary: projectjs.isTextBlockBoundary,
    projectTextBlockTypeEnum: projectjs.projectTextBlockTypeEnum,
}
