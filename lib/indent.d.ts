/**
 *
 * @param {string[]} contentArray
 * @param {int} level
 * @param {int} start
 * @param {int} end
 * @param {int} columnInterval
 * @param {boolean} debug
 * @param {int} skipLevel
 * @returns
 */
export function listToTreeWithSkip(contentArray: string[], level: int, start: int, end: int, columnInterval: int, debug: boolean, skipLevel: int): void;
/**
 *
 * @param {string[]} contentArray
 * @param {boolean} debug
 * @param {int} columnInterval
 * @param {int} skipLevel
 */
export function treeToListWithSkip(contentArray: string[], debug: boolean, columnInterval: int, skipLevel: int): void;
/**
 *
 * @param {string[]} contentArray
 * @param {int} skipLevel
 */
export function convert2Tree(contentArray: string[], skipLevel: int): void;
/**
 *
 * @param {string[]} contentArray
 * @param {int} skipLevel
 */
export function revert2Tree(contentArray: string[], skipLevel: int): void;
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {int} cursor
 * @returns {int}
 */
export function isIndent(textBlock: string[], rootPath: string, cursor: int): int;
