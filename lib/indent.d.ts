/**
 *
 * @param {string[]} contentArray
 * @param {number} skipLevel
 * @returns
 */
export function convert2Tree(contentArray: string[], skipLevel: number): {
    status: boolean;
    content: string;
};
/**
 *
 * @param {string[]} contentArray
 * @param {number} skipLevel
 * @returns
 */
export function revert2List(contentArray: string[], skipLevel: number): {
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
export function isIndent(textBlock: string[], rootPath: string, cursorOffset: number): {
    status: boolean;
    content: string;
};
