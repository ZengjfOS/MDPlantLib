/**
 *
 * @param {string} lineText
 * @returns {string}
 */
export function convert2List(lineText: string): string;
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {number} cursorOffset
 * @returns
 */
export function isList(textBlock: string[], rootPath: string, cursorOffset: number): false | {
    status: boolean;
    error: boolean;
    info: string;
};
