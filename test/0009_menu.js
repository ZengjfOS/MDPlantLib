const assert = require('assert')
const menujs = require('../lib/menu.js')
const fs = require("fs")
require('./lib/log.js')

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

        console.log(outputString)

        assert.equal(false, checkFlag)

    })
})
