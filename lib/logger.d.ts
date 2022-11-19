/**
 * 主要用于输出固定格式的log，加入模块tag标签作为模块区分，主要包括如下函数
 *
 * * info
 * * debug
 * * error
 * * setColor
 * * getColor
 * * logConsole
 * * logFile
 */
export class Logger {
    static _color: boolean;
    /**
     *
     * @param {boolean} status
     */
    static setColor(status: boolean): void;
    /**
     *
     * @returns
     */
    static getColor(): boolean;
    static _logFile: any;
    static _logStdout: any;
    /**
     *
     * @param {any} msg
     */
    static _logPrint(msg: any): void;
    /**
     *
     * @param {string} filePath
     */
    static logFile(filePath: string): void;
    static logConsole(): void;
    /**
     *
     * @param {string} tag
     * @param {boolean} color
     */
    constructor(tag: string, color?: boolean);
    tag: string;
    /**
     *
     * @param {any} format
     * @param  {...any} msg
     */
    info(format: any, ...msg: any[]): void;
    /**
     *
     * @param {any} format
     * @param  {...any} msg
     */
    debug(format: any, ...msg: any[]): void;
    /**
     *
     * @param {any} format
     * @param  {...any} msg
     */
    error(format: any, ...msg: any[]): void;
}
