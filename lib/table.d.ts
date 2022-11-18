/**
 *
 * @param {string | null | undefined} outputFile
 * @param {string} subProjectDocsDir
 * @returns {string}
 */
export function refreshReadmeDocsTable(outputFile: string | null | undefined, subProjectDocsDir: string): string;
/**
 *
 * @param {string} configPath
 * @param {string} table json key
 * @returns {string}
 */
export function convertJSON2Table(configPath: string, table: string): string;
/**
 *
 * @param {string} configPath
 * @returns {string}
 */
export function convertExcel2Table(configPath: string): string;
/**
 *
 * @param {string} lineValue
 * @returns {string}
 */
export function convertRowColume2Table(lineValue: string): string;
/**
 *
 * @param {string} lineValue
 * @param {string} rootPath
 * @returns
 */
export function convert2Table(lineValue: string, rootPath: string): string;
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {number} cursorOffset
 * @returns
 */
export function isTable(textBlock: string[], rootPath: string, cursorOffset: number): {
    status: boolean;
    error: boolean;
    info: string;
};
/**
 *
 * @param {string} rootPath
 * @param {string} relativePath
 * @param {string} suffix
 * @returns {string}
 */
export function generateIndexTable(rootPath: string, relativePath: string, suffix: string): string;
