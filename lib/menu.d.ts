/**
 *
 * @param {string[]} contentArray
 * @returns
 */
export function generateMenu(contentArray: string[]): {
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
export function isMenu(textBlock: string[], rootPath: string, cursorOffset: number): {
    status: boolean;
    content: string;
};
