/**
 *
 * @param {string[]} contentArray
 * @param {number} level
 * @param {number} start
 * @param {number} end
 * @param {number} columnInterval
 * @param {boolean} debug
 * @param {number} skipLevel
 * @returns
 */
export function listToTreeWithSkip(contentArray: string[], level: number, start: number, end: number, columnInterval: number, debug: boolean, skipLevel: number): void;
/**
 *
 * @param {string[]} contentArray
 * @param {boolean} debug
 * @param {number} columnInterval
 * @param {number} skipLevel
 */
export function treeToListWithSkip(contentArray: string[], debug: boolean, columnInterval: number, skipLevel: number): void;
/**
 *
 * @param {string[]} contentArray
 * @param {number} skipLevel
 */
export function convert2Tree(contentArray: string[], skipLevel: number): void;
/**
 *
 * @param {string[]} contentArray
 * @param {number} skipLevel
 */
export function revert2Tree(contentArray: string[], skipLevel: number): void;
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {number} cursorOffset
 * @returns
 */
export function isIndent(textBlock: string[], rootPath: string, cursorOffset: number): {
    status: boolean;
    error: boolean;
    info: string;
};
