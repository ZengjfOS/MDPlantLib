const assert = require('assert')

describe("test example", function() {
    it('check index', () => {
        assert.equal(-1, [1, 2, 3].indexOf(5))
    })

    it('check value', () => {
        assert.equal(1, 1)
    })
})
