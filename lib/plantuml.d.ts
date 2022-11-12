/**
 *
 * @param {int} level
 * @param {int} start
 * @param {int} end
 * @param {string[]} contentArray
 * @param {int} columnInterval
 * @param {boolean} debug
 * @param {int} skipLevel
 * @param {string[]} preActor
 * @returns
 */
export function listToSequenceDiagramWithSkip(level: int, start: int, end: int, contentArray: string[], columnInterval: int, debug: boolean, skipLevel: int, preActor?: string[]): void;
/**
 *
 * @param {string[]} contentArray
 * @param {int} skipLevel
 * @returns {string[]}
 */
export function convert2SequenceDiagram(contentArray: string[], skipLevel: int): string[];
/**
 *
 * @param {string} umlString
 * @param {string} plantumlServer
 * @param {string} outputPath
 * @param {function} cb
 * @returns
 */
export function getHTTPSVGImage(umlString: string, plantumlServer: string, outputPath: string, cb: Function): void;
/**
 *
 * @param {string[]} textBlock
 * @param {string} rootPath
 * @param {int} cursor
 * @returns
 */
export function isPlantuml(textBlock: string[], rootPath: string, cursor: int): false | {
    status: never;
    info: any;
};
