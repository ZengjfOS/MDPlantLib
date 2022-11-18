/**
 *
 * @param {number} level
 * @param {number} start
 * @param {number} end
 * @param {string[]} contentArray
 * @param {number} columnInterval
 * @param {boolean} debug
 * @param {number} skipLevel
 * @param {string[]} preActor
 * @returns
 */
export function listToSequenceDiagramWithSkip(level: number, start: number, end: number, contentArray: string[], columnInterval: number, debug: boolean, skipLevel: number, preActor?: string[]): void;
/**
 *
 * @param {string[]} contentArray
 * @param {number} skipLevel
 * @returns {string[]}
 */
export function convert2SequenceDiagram(contentArray: string[], skipLevel: number): string[];
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
    error: boolean;
    info: string;
};
