/**
 *
 * @param {string | null | undefined} outputFile
 * @param {string} subProjectDocsDir
 * @returns
 */
export function refreshReadmeDocsTable(outputFile: string | null | undefined, subProjectDocsDir: string): {
    status: boolean;
    content: string;
};
/**
 *
 * @param {string} configPath
 * @param {string} table json key
 * @returns
 */
export function convertJSON2Table(configPath: string, table: string): {
    status: boolean;
    content: string;
};
/**
 *
 * @param {string} configPath
 * @returns
 */
export function convertExcel2Table(configPath: string): {
    status: boolean;
    content: string;
};
/**
 *
 * @param {string} lineValue
 * @returns
 */
export function convertRowColume2Table(lineValue: string): {
    status: boolean;
    content: string;
};
/**
 *
 * @param {string} lineValue
 * @param {string} rootPath
 * @returns
 */
export function convert2Table(lineValue: string, rootPath: string): {
    status: boolean;
    content: string;
};
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {number} cursorOffset
 * @returns
 */
export function isTable(textBlock: string[], rootPath: string, cursorOffset: number): {
    status: boolean;
    content: string;
};
/**
 *
 * @param {string} rootPath
 * @param {string} relativePath
 * @param {string} suffix
 * @returns
 */
export function generateIndexTable(rootPath: string, relativePath: string, suffix?: string): {
    status: boolean;
    content: string;
};
