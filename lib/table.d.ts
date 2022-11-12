/**
 *
 * @param {string} outputFile
 * @param {string} subProjectDir
 * @returns {string}
 */
export function refreshReadme(outputFile: string, subProjectDir: string): string;
/**
 *
 * @param {string} configPath
 * @param {string} table json key
 * @returns {string}
 */
export function convertJSON2Table(configPath: string, table: string): string;
/**
 *
 * @param {string} lineValue
 * @returns {string}
 */
export function convertRowColume2Table(lineValue: string): string;
/**
 *
 * @param {string} lineValue
 * @returns {string}
 */
export function convert2Table(lineValue: string): string;
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {int} cursor
 * @returns {int}
 */
export function isTable(textBlock: string[], rootPath: string, cursor: int): int;
