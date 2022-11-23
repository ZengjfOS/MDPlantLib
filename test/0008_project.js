const assert = require('assert')
const projectjs = require('../lib/project.js')
const fs = require("fs")
const loggerjs = require("../lib/logger")
const mdplantlibtest = require('./lib/MDPlantLibTest')
loggerjs.Logger.logFile(__dirname + '/output/debug.log')

const logger = new loggerjs.Logger("project test")

describe("project", function() {

    it('new project', () => {
        let outputDir = "test/output/project"

        if (fs.existsSync(outputDir))
            fs.rmSync(outputDir, { recursive: true, force: true });

        fs.mkdirSync(outputDir)

        checkFlag = projectjs.newProject(outputDir, "zengjf")

        assert.equal(true, checkFlag)
    })

    it('new sub project', () => {
        let outputDir = "test/output/subproject"
        let checkFlag = false

        if (fs.existsSync(outputDir))
            fs.rmSync(outputDir, { recursive: true, force: true });

        projectjs.newSubProject(outputDir)
        if (fs.existsSync(outputDir + "/README.md"))
            checkFlag = true

        assert.equal(true, checkFlag)
    })

    it('new sub project work file', () => {
        let outputFile = "test/output/0008_work_file.md"
        let checkFlag = false

        if (fs.existsSync(outputFile))
            fs.unlinkSync(outputFile)

        projectjs.newSubProjectWorkFile(outputFile)
        if (fs.existsSync(outputFile))
            checkFlag = true

        assert.equal(true, checkFlag)
    })

    it('parsePath', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0008_project_test.json", "parsePath", data => {
            return projectjs.parsePath(data.input[0], data.input[1])
        })
    })

    it('parse text block', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0008_project_test.json", "parseTextBlock", data => {
            return projectjs.parseTextBlock(data.input, ".", 0)
        })
    })
})
