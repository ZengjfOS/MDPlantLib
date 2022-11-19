const fs = require('fs');
const util = require('util');

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
class Logger {
    static _color = false

    /**
     * 
     * @param {string} tag 
     * @param {boolean} color 
     */
    constructor(tag, color = false) { 
        this.tag = tag
        Logger._color = color
    }

    /**
     * 
     * @param {boolean} status 
     */
    static setColor(status) {
        Logger._color = status
    }

    /**
     * 
     * @returns 
     */
    static getColor() {
        return Logger._color
    }

    /**
     * 
     * @param {any} format 
     * @param  {...any} msg 
     */
    info (format, ...msg) {
        let msgString = eval("util.format(format, \"" + msg.join("\", \"") + "\")")
        if (Logger._color)
            console.log("[\x1b[34minfo\x1b[0m] [" + this.tag + "]: " + msgString)
        else
            console.log("[info] [" + this.tag + "]: " + msgString)
    }

    /**
     * 
     * @param {any} format 
     * @param  {...any} msg 
     */
    debug(format, ...msg) {
        let msgString = eval("util.format(format, \"" + msg.join("\", \"") + "\")")
        if (Logger._color)
            console.log("[\x1b[32mdebug\x1b[0m] [" + this.tag + "]: " + msgString)
        else
            console.log("[debug] [" + this.tag + "]: " + msgString)
    }

    /**
     * 
     * @param {any} format 
     * @param  {...any} msg 
     */
    error(format, ...msg) {
        let msgString = eval("util.format(format, \"" + msg.join("\", \"") + "\")")
        if (Logger._color)
            console.log("[\x1b[31merror\x1b[0m] [" + this.tag + "]: " + msgString)
        else
            console.log("[error] [" + this.tag + "]: " + msgString)
    }

    static _logFile = undefined
    static _logStdout = process.stdout;

    /**
     * 
     * @param {any} msg 
     */
    static _logPrint(msg) {
        if (Logger._logFile != undefined)
            Logger._logFile.write(util.format(msg) + '\n');
        else
            Logger._logStdout.write(util.format(msg) + '\n');
    }

    /**
     * 
     * @param {string} filePath 
     */
    static logFile(filePath) {
        Logger._logFile = fs.createWriteStream(filePath, {flags : 'a'});
        console.log = Logger._logPrint
    }

    static logConsole() {
        Logger._logFile = undefined
        console.log = Logger._logPrint
    }
}

module.exports = {
    Logger
}
