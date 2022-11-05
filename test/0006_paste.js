const assert = require('assert')
const pastejs = require('../lib/paste.js')

describe("paste", function() {

    it('save image', () => {
        let checkFlag = false

        pastejs.saveClipboardImageToFileAndGetPath(__dirname + "/output/0006_saved.png", (imagePath, imagePathReturnByScript) => {
            if (!imagePathReturnByScript) return;

            if (imagePathReturnByScript === 'no image') {
                checkFlag = false
            } else {
                checkFlag = true
            }

            assert.equal(true, checkFlag)
        });

    })

})
