const assert = require('assert')
const loggerjs = require("../lib/logger")

const logger = new loggerjs.Logger("color test")

describe("logger", function() {

    it('color test', () => {
        console.log(loggerjs.Logger.getColor())
        logger.info("no color")
        assert.equal(false, loggerjs.Logger.getColor())

        loggerjs.Logger.setColor(true)
        console.log(loggerjs.Logger.getColor())
        loggerjs.Logger.logConsole()
        logger.info("color")
        assert.equal(true, loggerjs.Logger.getColor())

        loggerjs.Logger.setColor(true)
        console.log(loggerjs.Logger.getColor())
        loggerjs.Logger.logFile(__dirname + '/output/debug.log')
        logger.info({"color": "red", "test": "color"})
        assert.equal(true, loggerjs.Logger.getColor())

        loggerjs.Logger.logConsole()
    })
})
