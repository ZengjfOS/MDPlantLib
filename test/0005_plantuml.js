const fs = require('fs');
const assert = require('assert')
const plantumljs = require('../lib/plantuml.js')
const loggerjs = require("../lib/logger")
loggerjs.Logger.logFile(__dirname + '/output/debug.log')

const logger = new loggerjs.Logger("plantuml test")

const sequenceList = 'test/refers/0005_sequence_list.txt'

describe("plantuml", function() {

    it('list convert to indent', () => {
        let checkFlag = false
        let contentArray = []

        try {
            let data = fs.readFileSync(sequenceList, 'utf8');

            data.split("\n").forEach(element => {
                if (element.trim().length != 0)
                    contentArray.push(element.replace(/\t/g, "    "))
            })

            // logger.info(contentArray)
        } catch (err) {
            logger.info(`Error reading file from disk: ${err}`);
        }

        if (contentArray.length == 0)
            assert.notEqual(0, contentArray.length)

        let columnInterval = 2
        let skipLevel = contentArray[0].indexOf("* ") / columnInterval
        plantumljs.listToSequenceDiagramWithSkip(0, 0, contentArray.length, contentArray, columnInterval, false, skipLevel)

        for (i = 1; i < contentArray.length; i++) {
            let filePathRegex = new RegExp("([^/ ]+.(c|h|cpp|java|py|rc))\\s*$", "g")
            let tableMatchValue = filePathRegex.exec(contentArray[i])

            if (tableMatchValue != null && tableMatchValue[1].length != 0) {
                continue
            } else {
                contentArray[i] = contentArray[i].replace(/<<enterspace_start>>/g, "").replace(/<<enterspace_end>>/g, "\n")
            }

            // logger.info(contentArray[i])
        }

        let row = 0
        contentArray.forEach(element => {
            if (row == 0) {
                row++

                return
            }

            if (!element.includes("->")) {
                // logger.info(element)
                checkFlag = true
            }
            
            row++
        });

        assert.equal(false, checkFlag)
    })

    it('get http svg image', () => {
        plantumljs.getHTTPPlantumlImage('A -> B: Hello', "http://www.plantuml.com/plantuml", "png", "test/output/0005_uml.png", status => {
            assert.equal(true, status)
        })
    })
})
