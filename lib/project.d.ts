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
 * * dir
 *   * mainPath
 *   * subPath
 *   * subSrcPath
 * * file
 *   * subPath
 *   * subSrcPath
 *   * subFileRelativePath
 * * readme
 *   * mainPath
 *   * subPath
 *   * subSrcPath
 *
 * @param {string} rootPath
 * @param {string} filePath
 * @returns
 */
export function parsePath(rootPath: string, filePath: string): {
    status: boolean;
    pathType: number;
    mainPath: string;
    subPath: string;
    subrelativePath: string;
    subSrcPath: string;
};
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
 * @param {number} cursorOffset
 * @returns
 */
export function parseTextBlock(textBlock: string[], rootPath: string, cursorOffset: number): {
    status: boolean;
    type: number;
    info: any;
    error: any;
};
/**
 *
 * @param {string} lineText
 */
export function isTextBlockBoundary(lineText: string): boolean;
export namespace projectTextBlockTypeEnum {
    const none_1: number;
    export { none_1 as none };
    export const menu: number;
    export const list: number;
    export const table: number;
    export const plantuml: number;
    export const indent: number;
}
