const assert = require('assert')
const pastejs = require('../lib/paste.js')
const loggerjs = require("../lib/logger")
loggerjs.Logger.logFile(__dirname + '/output/debug.log')

const logger = new loggerjs.Logger("paste test")

describe("paste", function() {

    it('save image', () => {
        let checkFlag = false

        let output = pastejs.saveClipboardImage(__dirname + "/output/0006_saved.png");
        logger.info(output)
        if (output.status == true) {
            checkFlag = true
        } else {
            logger.info(output)
        }

        assert.equal(true, checkFlag)
    })

})
