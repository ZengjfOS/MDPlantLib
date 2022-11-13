const assert = require('assert')

describe("test example", function() {

    let globalVar = "global variable"

    before(() => {
        console.log("do before operation")
        console.log(globalVar)
    })

    after(() => {
        console.log("do after operation")
        console.log(globalVar)
    })

    it('check index', () => {
        assert.equal(-1, [1, 2, 3].indexOf(5))
        console.log("check " + globalVar)
    })

    it('check value', () => {
        assert.equal(1, 1)
        console.log("check " + globalVar)
    })
})
