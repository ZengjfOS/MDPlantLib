const assert = require('assert')
const tablejs = require('../lib/table.js')
const fs = require("fs")
require('./lib/log.js')

describe("table", function() {

    it('refresh main readme', () => {
        let checkFlag = false
        fs.copyFileSync("test/refers/0008_README.md", "test/output/0008_main_README.md")

        let outputString = tablejs.refreshReadmeDocsTable("test/output/0008_main_README.md", "lib/res/mainProjectTemplate/src")
        if (outputString.includes("0000 | [Template](src/0000_Template/README.md)"))
            checkFlag = true

        console.log(outputString)

        assert.equal(true, checkFlag)

    })

    it('refresh sub readme', () => {
        let checkFlag = false
        fs.copyFileSync("test/refers/0008_README.md", "test/output/0008_sub_README.md")

        let outputString = tablejs.refreshReadmeDocsTable("test/output/0008_sub_README.md", "lib/res/subProjectTemplate/docs")
        if (outputString.includes("0001 | [template](docs/0001_template.md)"))
            checkFlag = true
        console.log(outputString)

        assert.equal(true, checkFlag)

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

        let outputString = tablejs.convert2Table("table 4*5", ".")
        outputString.split("\n").forEach(element => {
            if (!element.includes("|"))
                checkFlag = true
        });

        assert.equal(false, checkFlag)
    })

    it('table JSON file convert', () => {
        let checkFlag = false
        let configPath = 'test/refers/0004_table.json'

        let outputString = tablejs.convert2Table("table " + configPath, ".")
        outputString.split("\n").forEach(element => {
            if (!element.includes("|"))
                checkFlag = true
        });

        console.log(outputString)

        assert.equal(false, checkFlag)
    })

    it('table CSV file convert', () => {
        let checkFlag = false
        let configPath = 'test/refers/0004_table.csv'

        let outputString = tablejs.convert2Table("table " + configPath, ".")
        outputString.split("\n").forEach(element => {
            if (!element.includes("|"))
                checkFlag = true
        });

        console.log(outputString)

        assert.equal(false, checkFlag)
    })

    it('table CSV file convert', () => {
        let checkFlag = false
        let configPath = 'test/refers/0004_excel.xls'

        let outputString = tablejs.convert2Table("table " + configPath, ".")
        outputString.split("\n").forEach(element => {
            if (element.length > 0 &&  !element.includes("|"))
                checkFlag = true
        });

        console.log(outputString)

        assert.equal(false, checkFlag)
    })

    it('is table', () => {
        let checkFlag = false
        let configPath = 'test/refers/0004_excel.xls'

        let outputString = tablejs.isTable(["table " + configPath], ".", 0)
        if (outputString.status)
            checkFlag = true

        console.log(outputString)

        assert.equal(true, checkFlag)
    })
})
