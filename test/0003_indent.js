const indentjs = require('../lib/indent.js')
const mdplantlibtest = require('./lib/MDPlantLibTest')

describe("indent", function() {

    it('is indent', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0003_indent_test.json", "isindent", data => {
            let contentArray = data.input.slice()

            return indentjs.isIndent(contentArray, ".", 0)
        })
    })

    it('convert to tree', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0003_indent_test.json", "convert2Tree", data => {
            let contentArray = data.input.slice()
            let columnInterval = 2
            let skipLeve = contentArray[0].indexOf("* ") / columnInterval

            return indentjs.convert2Tree(contentArray, skipLeve)
        })
    })

    it('revert to tree', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0003_indent_test.json", "revert2Tree", data => {
            let contentArray = data.input.slice()
            let columnInterval = 2
            let skipLeve = contentArray[0].indexOf("* ") / columnInterval

            return indentjs.revert2List(contentArray, skipLeve)
        })
    })
})
