// 主要功能函数入口
 
const indentjs = require('./lib/indent.js')
const tablejs = require('./lib/table.js')
const plantumljs = require('./lib/plantuml.js')
const pastejs = require('./lib/paste.js')
const listjs = require('./lib/list.js')
const projectjs = require('./lib/project.js')
const menujs = require('./lib/menu.js')
const loggerjs = require('./lib/logger.js')

// 向外输入格式转换函数
module.exports = {
    // lib/plantuml.js
    convert2SequenceDiagram: plantumljs.convert2SequenceDiagram,
    getHTTPPlantumlImage: plantumljs.getHTTPPlantumlImage,

    // lib/table.js
    convert2Table: tablejs.convert2Table,
    refreshReadmeDocsTable: tablejs.refreshReadmeDocsTable,
    generateIndexTable: tablejs.generateIndexTable,

    // lib/indent.js
    convert2Tree: indentjs.convert2Tree,
    revert2List: indentjs.revert2List,

    // lib/paste.js
    saveClipboardImage: pastejs.saveClipboardImage,

    // lib/list.js
    convert2List: listjs.convert2List,

    // lib/project.js
    projectPathTypeEnum: projectjs.projectPathTypeEnum,
    projectTextBlockTypeEnum: projectjs.projectTextBlockTypeEnum,
    newSubProjectWorkFile: projectjs.newSubProjectWorkFile,
    newSubProject: projectjs.newSubProject,
    newProject: projectjs.newProject,
    parsePath: projectjs.parsePath,
    parseTextBlock: projectjs.parseTextBlock,

    // lib/menu.js
    generateMenu: menujs.generateMenu,

    // lig/logger.js
    Logger:loggerjs.Logger,
}
