const fs = require("fs")
const tablejs = require('../lib/table.js')
const mdplantlibtest = require('./lib/MDPlantLibTest')

describe("table", function() {

    it('refresh readme', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0004_table_test.json", "refreshReadmeDocsTable", data => {
            fs.copyFileSync(data.input[0], data.input[1])
            return tablejs.refreshReadmeDocsTable(data.input[1], data.input[2])
        })
    })

    it('index table', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0004_table_test.json", "generateIndexTable", data => {
            return tablejs.generateIndexTable(data.input[0], data.input[1], "")
        })
    })

    it('convert to table', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0004_table_test.json", "convert2Table", data => {
            return tablejs.convert2Table(data.input, ".", 0)
        })
    })

    it('is table', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0004_table_test.json", "isTable", data => {
            return tablejs.isTable(data.input, ".", 0)
        })
    })
})
