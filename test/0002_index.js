const fs = require('fs');
const assert = require('assert')
const indexjs = require('../index.js')

const loggerjs = require("../lib/logger")
loggerjs.Logger.logFile(__dirname + '/output/debug.log')
const logger = new loggerjs.Logger("index test")

describe("index", function() {

})
