import plantumljs = require("./lib/plantuml.js");
import tablejs = require("./lib/table.js");
import indentjs = require("./lib/indent.js");
import pastejs = require("./lib/paste.js");
import listjs = require("./lib/list.js");
import projectjs = require("./lib/project.js");
export const convert2SequenceDiagram: typeof plantumljs.convert2SequenceDiagram;
export const convert2Table: typeof tablejs.convert2Table;
export const refreshReadme: typeof tablejs.refreshReadme;
export const convert2Tree: typeof indentjs.convert2Tree;
export const revert2Tree: typeof indentjs.revert2Tree;
export const saveClipboardImage: typeof pastejs.saveClipboardImage;
export const convert2List: typeof listjs.convert2List;
export const projectPathTypeEnum: {
    none: number;
    dir: number;
    file: number;
    readme: number;
};
export const newSubProjectWorkFile: typeof projectjs.newSubProjectWorkFile;
export const newSubProject: typeof projectjs.newSubProject;
export const newProject: typeof projectjs.newProject;
export const parsePath: typeof projectjs.parsePath;
export const parseTextBlock: typeof projectjs.parseTextBlock;
export const getRootPath: typeof projectjs.getRootPath;
export const isTextBlockBoundary: typeof projectjs.isTextBlockBoundary;
export const projectTextBlockTypeEnum: {
    none: number;
    file: number;
    list: number;
    table: number;
    plantuml: number;
    indent: number;
};
