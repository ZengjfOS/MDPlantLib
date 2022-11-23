const listjs = require('../lib/list.js')
const mdplantlibtest = require('./lib/MDPlantLibTest')

describe("list", function() {

    it('convert to List', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0007_list_test.json", "convert2List", data => {
            return listjs.convert2List(data.input[0], ".", 0)
        })
    })

    it('is list', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0007_list_test.json", "isList", data => {
            return listjs.isList(data.input, ".", 0)
        })
    })
})
