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
 * @param {int} cursor
 * @returns
 */
export function isList(textBlock: string[], rootPath: string, cursor: int): false | {
    status: boolean;
    info: string;
};
