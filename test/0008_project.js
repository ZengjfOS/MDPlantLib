const assert = require('assert')
const projectjs = require('../lib/project.js')
const fs = require("fs")
require('./lib/log.js')

describe("project", function() {

    it('refresh main readme', () => {
        let checkFlag = false
        fs.copyFileSync("test/refers/0008_README.md", "test/output/0008_main_README.md")

        let outputString = projectjs.refreshProjectReadme("test/output/0008_main_README.md", "lib/res/mainProjectTemplate/src")
        if (outputString.includes("0000| [Template](lib/res/mainProjectTemplate/src/0000_Template/README.md) |"))
            checkFlag = true

        console.log(outputString)

        assert.equal(true, checkFlag)

    })

    it('refresh sub readme', () => {
        let checkFlag = false
        fs.copyFileSync("test/refers/0008_README.md", "test/output/0008_sub_README.md")

        let outputString = projectjs.refreshProjectReadme("test/output/0008_sub_README.md", "lib/res/subProjectTemplate/docs")
        if (outputString.includes("0001| [template](lib/res/subProjectTemplate/docs/0001_template.md) |"))
            checkFlag = true
        console.log(outputString)

        assert.equal(true, checkFlag)

    })

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
})
