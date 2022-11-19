const assert = require('assert')
const listjs = require('../lib/list.js')
const loggerjs = require("../lib/logger")
loggerjs.Logger.logFile(__dirname + '/output/debug.log')

const logger = new loggerjs.Logger("list test")

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

    it('isList', () => {
        let checkFlag = false
        let outputString

        outputString = listjs.isList(["tt src/0002_tt/README.md"], "", 0)
        logger.info(outputString)
        if (outputString.status)
            checkFlag = true

        assert.equal(true, checkFlag)

        checkFlag = false
        outputString = listjs.isList(["table src/0002_tt/README.json"], "", 0)
        logger.info(outputString)
        if (outputString.status)
            checkFlag = true

        assert.equal(false, checkFlag)

        checkFlag = false
        outputString = listjs.isList(["src/0002_tt/README.json"], "", 0)
        logger.info(outputString)
        if (outputString.status)
            checkFlag = true

        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = listjs.isList(["docs/0002_unit_test.md"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)
    })
})
