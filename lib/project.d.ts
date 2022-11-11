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
export function rootPath(workspaceFolders: workspaceFolder[], filePath: string): string;
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
 * @param {string} lineText
 * @param {string} rootPath
 * @returns {int}
 */
export function parseLine(lineText: string, rootPath: string): int;
