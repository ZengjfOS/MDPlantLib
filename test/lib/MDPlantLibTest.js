const fs = require('fs');
const assert = require('assert')
const loggerjs = require('../../lib/logger')

const logger = new loggerjs.Logger("example test")

function loadJsonDataset(filePath, jsonDatasetName) {

    let tableEntry

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        // parse JSON string to JSON object
        const config = JSON.parse(data);

        tableEntry = eval('config.' + jsonDatasetName)
    } catch (err) {
        logger.info(`Error reading file from disk: ${err}`);
        tableEntry = {"title": "can't get data", "sets": []}
    }

    return tableEntry
}

async function MDPlantLibTestSample(jsonFilePath, jsonDatasetName, doWork) {

    let dataset = loadJsonDataset(jsonFilePath, jsonDatasetName)

    if ((!dataset.hasOwnProperty("enable")) || dataset.enable) {
        logger.info("[config] start dataset: " + dataset.title)
        for (let i = 0; i < dataset.sets.length; i++) {
            let data = dataset.sets[i]

            logger.info("----------------------start mdplant unit test--------------------------------- ")
            logger.info("[config] " + data.title)
            if (data.hasOwnProperty("description"))
                logger.info("[config] " + data.description)

            if ((!data.hasOwnProperty("enable")) || data.enable) {
                let runFlag = doWork(data)

                logger.info("[config] return runFlag: " + runFlag)
                assert.equal(true, runFlag);
            } else {
                logger.info("[config] skip dataset item: " + data.title)
            }

            logger.info("------------------------end mdplant unit test--------------------------------- ")
        }
    } else {
        logger.info("[config] skip dataset: " + dataset.title)
    }
}

module.exports = {
    loadJsonDataset,
    MDPlantLibTestSample,
}
