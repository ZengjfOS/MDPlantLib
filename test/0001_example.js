const assert = require('assert')
const mdplantlibtest = require('./lib/MDPlantLibTest')
const loggerjs = require('../lib/logger')
loggerjs.Logger.logFile(__dirname + '/output/debug.log')

const logger = new loggerjs.Logger("example test")

describe("test example", function() {

    let globalVar = "global variable"

    before(() => {
        logger.info("do before operation")
        logger.info(globalVar)
        logger.debug("%s, %s", "before", "logger print")
    })

    after(() => {
        logger.info("do after operation")
        logger.info(globalVar)
    })

    it('check index', () => {
        assert.equal(-1, [1, 2, 3].indexOf(5))
        logger.info("check " + globalVar)
    })

    it('check value', () => {
        assert.equal(1, 1)
        logger.info("check " + globalVar)
    })

    it('check list', () => {
        logger.info("start check list")
        mdplantlibtest.MDPlantLibTestSample("test/refers/0001_list.json", "dataset", data => {
            logger.info(data)

            return true
        })
        logger.info("end check list")
    })
})
