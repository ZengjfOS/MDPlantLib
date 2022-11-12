const assert = require('assert')
const projectjs = require('../lib/project.js')
const fs = require("fs")
require('./lib/log.js')

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

    it('path info', () => {
        let workspaceFolders = [
                                    {
                                        "url": {
                                            "path" : "/home/zengjf/zengjf/github/android"
                                        },
                                        "name": "android",
                                        "index": 0
                                    
                                    }
                                ]

        let checkFlag = false
        let path = ""
        let pathInfo = ""

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.dir 
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up"
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.dir 
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up"
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/images"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.dir 
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up"
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/refers"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.dir 
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up"
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0003_bring_up"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.dir 
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/docs/0003_bring_up"
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.dir 
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up"
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up/docs"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.dir 
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up"
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up/docs/images"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.dir 
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up"
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up/docs/refers"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.dir 
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/docs/0003_bring_up/docs/0004_bring_up"
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0071_typescript_declare.md"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.file
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/"
                    && pathInfo.subSrcPath == "docs"
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/docs/0071_typescript_declare.md"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.file
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == ""
                    && pathInfo.subSrcPath == "docs"
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0003_bring_up/src/0071_typescript_declare.md"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.file
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/docs/0003_bring_up/"
                    && pathInfo.subSrcPath == "src"
                    && pathInfo.subrelativePath == "src/0071_typescript_declare.md"
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0003_bring_up/src/images/0071_typescript_declare.png"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.file
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/docs/0003_bring_up/"
                    && pathInfo.subSrcPath == "src"
                    && pathInfo.subrelativePath == "src/images/0071_typescript_declare.png"
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0003_bring_up/src/refers/0071_typescript_declare.txt"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.file
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/docs/0003_bring_up/"
                    && pathInfo.subSrcPath == "src"
                    && pathInfo.subrelativePath == "src/refers/0071_typescript_declare.txt"
                ) {
            checkFlag = true
            console.log(pathInfo.subSrcPath)
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/docs/0005_bring_up/README.md"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.readme
                    && pathInfo.mainPath == "src/0002_bring_up/"
                    && pathInfo.subPath == "src/0002_bring_up/docs/0005_bring_up/"
                    && pathInfo.subSrcPath == "docs"
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/src/0002_bring_up/README.md"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.readme
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == "src/0002_bring_up/"
                    && pathInfo.subSrcPath == "src"
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android/README.md"
        pathInfo = projectjs.parsePath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo.status 
                    && pathInfo.pathType == projectjs.projectPathTypeEnum.readme
                    && pathInfo.mainPath == ""
                    && pathInfo.subPath == ""
                    && pathInfo.subSrcPath == ""
                ) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)
    })

    it('root path', () => {
        let workspaceFolders = [
                                    {
                                        "url": {
                                            "path" : "/home/zengjf/zengjf/github/android"
                                        },
                                        "name": "android",
                                        "index": 0
                                    
                                    }
                                ]

        let path = "/home/zengjf/zengjf/github/android/src/0002_bring_up"
        let pathInfo = projectjs.getRootPath(workspaceFolders, path)
        checkFlag = false
        if (pathInfo == "/home/zengjf/zengjf/github/android") {
            checkFlag = true
        }
        assert.equal(true, checkFlag)
    })

    it('parseTextBlock', () => {
        let path 
        let lineInfo

        console.log("-----------test list-------------")

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["docs/0002_unit_test.md"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["* [0002_unit_test.md](docs/0002_unit _test.md)"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["0002_unit_test.md docs/0002_在unit_test.md"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["0002_unit_不test.md http://zengjf.fun/docs/0002_unit_test.md"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["0002_unit"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(false, checkFlag)

        console.log("-----------test table-------------")

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["table 4*5"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["table test/refers/0004_table.json"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["zengjf | [](zengjf.fun)"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["NO.|文件名称|摘要", "zengjf | [](zengjf.fun)"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        path = "/home/zengjf/zengjf/github/android"
        lineInfo = projectjs.parseTextBlock(["```plantuml", "zengjf | [](zengjf.fun)"], path, 0)

        checkFlag = false
        if (lineInfo.status) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)
    })

    it('boundary block', () => {
        let checkFlag
        let boundary

        checkFlag = false
        boundary = projectjs.isTextBlockBoundary("")
        if (boundary) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)

        checkFlag = false
        boundary = projectjs.isTextBlockBoundary(" 1")
        if (boundary) {
            checkFlag = true
        }
        assert.equal(false, checkFlag)

        checkFlag = false
        boundary = projectjs.isTextBlockBoundary("```")
        if (boundary) {
            checkFlag = true
        }
        assert.equal(true, checkFlag)
    })
})
