const fs = require('fs');
const assert = require('assert')

function loadJsonDataset(filePath, jsonDatasetName) {

    let tableEntry

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        // parse JSON string to JSON object
        const config = JSON.parse(data);

        tableEntry = eval('config.' + jsonDatasetName)
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
        tableEntry = {"title": "can't get data", "sets": []}
    }

    return tableEntry
}

async function MDPlantLibTestSample(jsonFilePath, jsonDatasetName, doWork) {

    let dataset = loadJsonDataset(jsonFilePath, jsonDatasetName)

    if ((!dataset.hasOwnProperty("enable")) || dataset.enable) {
        console.log("[config] start dataset: " + dataset.title)
        for (let i = 0; i < dataset.sets.length; i++) {
            let data = dataset.sets[i]

            console.log("----------------------start mdplant unit test--------------------------------- ")
            console.log("[config] " + data.title)
            if (data.hasOwnProperty("description"))
                console.log("[config] " + data.description)

            if ((!data.hasOwnProperty("enable")) || data.enable) {
                let runFlag = doWork(data)

                console.log("[config] return runFlag: " + runFlag)
                assert.equal(true, runFlag);
            } else {
                console.log("[config] skip dataset item: " + data.title)
            }

            console.log("------------------------end mdplant unit test--------------------------------- ")
        }
    } else {
        console.log("[config] skip dataset: " + dataset.title)
    }
}

module.exports = {
    loadJsonDataset,
    MDPlantLibTestSample,
}
