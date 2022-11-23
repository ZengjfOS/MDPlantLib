/**
 *
 * @param {string[]} contentArray
 * @param {number} skipLevel
 * @returns
 */
export function convert2SequenceDiagram(contentArray: string[], skipLevel: number): {
    status: boolean;
    content: string;
};
/**
 *
 * @param {string} umlString
 * @param {string} plantumlServer
 * @param {string} suffix
 * @param {string} outputPath
 * @param {(status: boolean) => void} cb
 */
export function getHTTPPlantumlImage(umlString: string, plantumlServer: string, suffix: string, outputPath: string, cb: (status: boolean) => void): void;
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {number} cursorOffset
 * @returns
 */
export function isPlantuml(textBlock: string[], rootPath: string, cursorOffset: number): false | {
    status: boolean;
    content: string;
};
