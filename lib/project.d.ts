/**
 *
 * @param {string} outputDir
 * @param {string} author
 * @returns {boolean}
 */
export function newProject(outputDir: string, author: string): boolean;
/**
 *
 * @param {string} subProjectDir
 */
export function newSubProject(subProjectDir: string): void;
/**
 *
 * @param {string} outputFile
 */
export function newSubProjectWorkFile(outputFile: string): void;
/**
 *
 * @param {workspaceFolder[]} workspaceFolders
 * @param {string} filePath
 * @returns {string}
 */
export function getRootPath(workspaceFolders: workspaceFolder[], filePath: string): string;
/**
 *
 * @param {workspaceFolder[]} workspaceFolders
 * @param {string} filePath
 * @returns {string}
 */
export function parsePath(workspaceFolders: workspaceFolder[], filePath: string): string;
export namespace projectPathTypeEnum {
    const none: number;
    const dir: number;
    const file: number;
    const readme: number;
}
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {int} cursor
 * @returns {int}
 */
export function parseTextBlock(textBlock: string[], rootPath: string, cursor: int): int;
/**
 *
 * @param {string} lineText
 */
export function isTextBlockBoundary(lineText: string): boolean;
export namespace projectTextBlockTypeEnum {
    const none_1: number;
    export { none_1 as none };
    const file_1: number;
    export { file_1 as file };
    export const list: number;
    export const table: number;
    export const plantuml: number;
    export const indent: number;
}
