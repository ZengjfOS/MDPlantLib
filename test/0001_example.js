const mdplantlibtest = require('./lib/MDPlantLibTest')
const loggerjs = require('../lib/logger')
loggerjs.Logger.logFile(__dirname + '/output/debug.log')

const logger = new loggerjs.Logger("example test")

describe("test example", function() {

    before(() => {
        logger.info("do before operation")
    })

    after(() => {
        logger.info("do after operation")
    })

    it('MDPlantLibTestSample', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0001_example.json", "dataset", data => {
            return {"status": true, "content": data.input[0]}
        })
    })
})
