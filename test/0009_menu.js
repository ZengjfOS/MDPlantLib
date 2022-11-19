const assert = require('assert')
const fs = require("fs")
const menujs = require('../lib/menu.js')
const loggerjs = require("../lib/logger")
loggerjs.Logger.logFile(__dirname + '/output/debug.log')

const logger = new loggerjs.Logger("menu test")

describe("menu", function() {

    it('generate menu', () => {
        const fileContent = fs.readFileSync("test/refers/0009_menu.md", 'utf8').split(/\r?\n/);
        let checkFlag = false
        let outputString = menujs.generateMenu(fileContent)

        for (let i = 0; i < outputString.length; i++) {
            let lineText = outputString[i]
            if (!lineText.trim().startsWith("* ")) {
                checkFlag = true
                break
            }
        }

        logger.info(outputString)

        assert.equal(false, checkFlag)

    })
})
