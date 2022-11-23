/**
 *
 * @param {string} lineText
 * @returns
 */
export function convert2List(lineText: string): {
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
export function isList(textBlock: string[], rootPath: string, cursorOffset: number): {
    status: boolean;
    content: string;
};
