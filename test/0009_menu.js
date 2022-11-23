const menujs = require('../lib/menu.js')
const mdplantlibtest = require('./lib/MDPlantLibTest')

describe("menu", function() {

    it('generate menu', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0009_menu_test.json", "generateMenu", data => {
            return menujs.generateMenu(data.input)
        })
    })

    it('is menu', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0009_menu_test.json", "isMenu", data => {
            return menujs.isMenu(data.input, ".", 0)
        })
    })
})
