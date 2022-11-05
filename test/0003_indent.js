const fs = require('fs');
const assert = require('assert')
const indentjs = require('../lib/indent.js')

const indentList = 'test/refers/0003_indent_list.txt'
const indentTree = 'test/refers/0003_indent_tree.txt'

describe("indent", function() {

    it('list convert to indent', () => {
        let checkFlag = false
        let contentArray = []

        try {
            data = fs.readFileSync(indentList, 'utf8');

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
        indentjs.listToTreeWithSkip(0, 0, contentArray.length, contentArray, columnInterval, false, skipLeve)
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
            data = fs.readFileSync(indentTree, 'utf8');

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
        indentjs.treeToListWithSkip(contentArray, false, columnInterval, skipLeve)
        // console.log(contentArray)

        contentArray.forEach(element => {
            if (!element.includes("* "))
                checkFlag = true
        });

        assert.equal(false, checkFlag)
    })
})
