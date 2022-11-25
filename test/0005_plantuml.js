const assert = require('assert')
const mdplantlibtest = require('./lib/MDPlantLibTest')
const plantumljs = require('../lib/plantuml.js')

describe("plantuml", function() {

    it('get http svg image', () => {
        plantumljs.getHTTPPlantumlImage('A -> B: Hello', "http://www.plantuml.com/plantuml", "png", "test/output/0005_http_uml.png", status => {
            assert.equal(true, status)
        })
    })

    it('convert to sequence diagram', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0005_plantuml_test.json", "convert2SequenceDiagram", data => {
            return plantumljs.convert2SequenceDiagram(data.input.slice(), 0)
        })
    })

    it('is plantuml', () => {
        mdplantlibtest.MDPlantLibTestSample("test/refers/tests/0005_plantuml_test.json", "isPlantuml", data => {
            return plantumljs.isPlantuml(data.input.slice(), "", 0)
        })
    })
})
