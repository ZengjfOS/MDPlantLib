const assert = require('assert')
const listjs = require('../lib/list.js')
require('./lib/log.js')

describe("list", function() {

    it('convert http', () => {
        let checkFlag = false

        let outputString = listjs.convert2List("zengjf https://zengjf.fun")
        if (outputString.length != 0 && outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })

    it('revert http', () => {
        let checkFlag = false

        let outputString = listjs.convert2List("* [zengjf](https://zengjf.fun)")
        if (outputString.length != 0 && !outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })

    it('convert path', () => {
        let checkFlag = false

        let outputString = listjs.convert2List("lib/list.js")
        if (outputString.length != 0 && outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })


    it('revert path', () => {
        let checkFlag = false

        let outputString = listjs.convert2List("* [list.js](lib/list.js)")
        if (outputString.length != 0 && !outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })

    it('convert image', () => {
        let checkFlag = false

        let outputString = listjs.convert2List("lib/list.png")
        if (outputString.length != 0 && outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })


    it('revert image', () => {
        let checkFlag = false

        let outputString = listjs.convert2List("![list.js](lib/list.png)")
        if (outputString.length != 0 && !outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })

    it('convert image with space', () => {
        let checkFlag = false

        let outputString = listjs.convert2List("lib/list .png")
        if (outputString.length != 0 && outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })


    it('revert image with space', () => {
        let checkFlag = false

        let outputString = listjs.convert2List("![list .js](lib/list%20_%20.png)")
        if (outputString.length != 0 && !outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })
})
