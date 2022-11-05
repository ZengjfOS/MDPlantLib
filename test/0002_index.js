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
        indexjs.revert2List(contentArray, skipLeve)
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
})
