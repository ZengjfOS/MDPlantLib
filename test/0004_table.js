const assert = require('assert')
const tablejs = require('../lib/table.js')
require('./lib/log.js')

const configPath = 'test/refers/0004_table.json'

describe("table", function() {

    it('json convert to table', () => {
        let checkFlag = false

        let outputString = tablejs.convertJSON2Table(configPath, "table")
        outputString.split("\n").forEach(element => {
            if (!element.includes("|"))
                checkFlag = true
        });

        assert.equal(false, checkFlag)
    })

    it('row*colume convert to table', () => {
        let checkFlag = false

        let outputString = tablejs.convertRowColume2Table("table 4*5")
        outputString.split("\n").forEach(element => {
            if (!element.includes("|"))
                checkFlag = true
        });

        assert.equal(false, checkFlag)
    })

    it('table row*colume convert', () => {
        let checkFlag = false

        let outputString = tablejs.convert2Table("table 4*5")
        outputString.split("\n").forEach(element => {
            if (!element.includes("|"))
                checkFlag = true
        });

        assert.equal(false, checkFlag)
    })

    it('table JSON file convert', () => {
        let checkFlag = false

        let outputString = tablejs.convert2Table("table " + configPath)
        outputString.split("\n").forEach(element => {
            if (!element.includes("|"))
                checkFlag = true
        });

        console.log(outputString)

        assert.equal(false, checkFlag)
    })
})
