/**
 *
 * @param {string[]} contentArray
 * @returns {string[]}
 */
export function generateMenu(contentArray: string[]): string[];
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {number} cursorOffset
 * @returns
 */
export function isMenu(textBlock: string[], rootPath: string, cursorOffset: number): {
    status: boolean;
    error: boolean;
    info: string;
};
