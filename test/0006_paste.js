const assert = require('assert')
const pastejs = require('../lib/paste.js')
require('./lib/log.js')

describe("paste", function() {

    it('save image', () => {
        let checkFlag = false

        let output = pastejs.saveClipboardImage(__dirname + "/output/0006_saved.png");
        console.log(output)
        if (output.status == true) {
            checkFlag = true
        } else {
            console.log(output)
        }

        assert.equal(true, checkFlag)
    })

})
