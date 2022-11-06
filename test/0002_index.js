const fs = require('fs');
const assert = require('assert')
const indexjs = require('../index.js')

const configPath = 'test/refers/0004_table.json'
const indexList = 'test/refers/0003_indent_list.txt'
const indexTree = 'test/refers/0003_indent_tree.txt'
const sequenceList = 'test/refers/0005_sequence_list.txt'

describe("index", function() {

    it('list convert to index', () => {
        let checkFlag = false
        let contentArray = []

        try {
            let data = fs.readFileSync(indexList, 'utf8');

            data.split("\n").forEach(element => {
                if (element.trim().length != 0)
                    contentArray.push(element.replace(/\t/g, "    "))
            })

            // console.log(contentArray)
        } catch (err) {
            console.log(`Error reading file from disk: ${err}`);
        }

        if (contentArray.length == 0)
            assert.notEqual(0, contentArray.length)

        let columnInterval = 2
        let skipLeve = contentArray[0].indexOf("* ") / columnInterval
        indexjs.convert2Tree(contentArray, skipLeve)
        // console.log(contentArray)

        let row = 0
        contentArray.forEach(element => {
            if (row == 0) {
                row++

                return
            }

            if (!element.includes("──"))
                checkFlag = true
            
            row++
        });

        assert.equal(false, checkFlag)
    })

    it('tree convert to list', () => {
        let checkFlag = false
        let contentArray = []

        try {
            let data = fs.readFileSync(indexTree, 'utf8');

            data.split("\n").forEach(element => {
                if (element.trim().length != 0)
                    contentArray.push(element.replace(/\t/g, "    "))
            })

            // console.log(contentArray)
        } catch (err) {
            console.log(`Error reading file from disk: ${err}`);
        }

        if (contentArray.length == 0)
            assert.notEqual(0, contentArray.length)

        let columnInterval = 2
        let skipLeve = contentArray[0].indexOf("* ") / columnInterval
        indexjs.revert2Tree(contentArray, skipLeve)
        // console.log(contentArray)

        let row = 0
        contentArray.forEach(element => {
            if (!element.includes("* "))
                checkFlag = true
        });

        assert.equal(false, checkFlag)
    })

    it('table row*colume convert', () => {
        let checkFlag = false

        let outputString = indexjs.convert2Table("table 4*5")
        outputString.split("\n").forEach(element => {
            if (!element.includes("|"))
                checkFlag = true
        });

        assert.equal(false, checkFlag)
    })

    it('table JSON file convert', () => {
        let checkFlag = false

        let outputString = indexjs.convert2Table("table " + configPath)
        outputString.split("\n").forEach(element => {
            if (!element.includes("|"))
                checkFlag = true
        });

        assert.equal(false, checkFlag)
    })

    it('list convert to Sequence Diagram', () => {
        let checkFlag = false
        let contentArray = []

        try {
            let data = fs.readFileSync(sequenceList, 'utf8');

            data.split("\n").forEach(element => {
                if (element.trim().length != 0)
                    contentArray.push(element.replace(/\t/g, "    "))
            })

            // console.log(contentArray)
        } catch (err) {
            console.log(`Error reading file from disk: ${err}`);
        }

        if (contentArray.length == 0)
            assert.notEqual(0, contentArray.length)

        let columnInterval = 2
        let skipLevel = contentArray[0].indexOf("* ") / columnInterval
        indexjs.convert2SequenceDiagram(contentArray, skipLevel)

        // for (i = 1; i < contentArray.length; i++) {
        //     console.log(contentArray[i])
        // }

        let row = 0
        contentArray.forEach(element => {
            if (row == 0) {
                row++

                return
            }

            if (!element.includes("->")) {
                console.log(element)
                checkFlag = true
            }
            
            row++
        });

        assert.equal(false, checkFlag)
    })

    it('save image', () => {
        let checkFlag = false

        indexjs.saveClipboardImage(__dirname + "/output/0002_saved.png", (imagePath, imagePathReturnByScript) => {
            if (!imagePathReturnByScript) return;

            if (imagePathReturnByScript === 'no image') {
                checkFlag = false
            } else {
                checkFlag = true
            }

            assert.equal(true, checkFlag)
        });

    })

    it('convert image with space', () => {
        let checkFlag = false

        let outputString = indexjs.convert2List("lib/list .png")
        if (outputString.length != 0 && outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })


    it('revert image with space', () => {
        let checkFlag = false

        let outputString = indexjs.convert2List("![list .js](lib/list%20_%20.png)")
        if (outputString.length != 0 && !outputString.includes("]("))
            checkFlag = true

        assert.equal(true, checkFlag)

    })

    it('refresh main readme', () => {
        let checkFlag = false
        fs.copyFileSync("test/refers/0008_README.md", "test/output/0008_main_README.md")

        let outputString = indexjs.refreshProjectReadme("test/output/0008_main_README.md", "lib/res/mainProjectTemplate/src")
        if (outputString.includes("0000| [Template](lib/res/mainProjectTemplate/src/0000_Template/README.md) |"))
            checkFlag = true

        console.log(outputString)

        assert.equal(true, checkFlag)

    })

    it('refresh sub readme', () => {
        let checkFlag = false
        fs.copyFileSync("test/refers/0008_README.md", "test/output/0008_sub_README.md")

        let outputString = indexjs.refreshProjectReadme("test/output/0008_sub_README.md", "lib/res/subProjectTemplate/docs")
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

        checkFlag = indexjs.newProject(outputDir, "zengjf")

        assert.equal(true, checkFlag)
    })

    it('new sub project', () => {
        let outputDir = "test/output/subproject"
        let checkFlag = false

        if (fs.existsSync(outputDir))
            fs.rmSync(outputDir, { recursive: true, force: true });

        indexjs.newSubProject(outputDir)
        if (fs.existsSync(outputDir + "/README.md"))
            checkFlag = true

        assert.equal(true, checkFlag)
    })

    it('new sub project work file', () => {
        let outputFile = "test/output/0008_work_file.md"
        let checkFlag = false

        if (fs.existsSync(outputFile))
            fs.unlinkSync(outputFile)

        indexjs.newSubProjectWorkFile(outputFile)
        if (fs.existsSync(outputFile))
            checkFlag = true

        assert.equal(true, checkFlag)
    })
})
