const fs = require('fs');
const assert = require('assert')

const loggerjs = require('../../lib/logger')
loggerjs.Logger.logFile(__dirname + '/../output/debug.log')
const logger = new loggerjs.Logger("MDPlantLibTest")

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

function checkContent(checkData, data) {
    let status = false
    logger.info("enter checkContent")

    if (checkData.hasOwnProperty("content")) {
        if (checkData.content == data.content.join("\n")) {
            status = true
        }
    }

    if (!status) {
        logger.info(checkData)
        logger.info(data)
    }

    logger.info("exit checkContent")
    
    return status
}

function checkStatus(checkData, data) {
    let status = false
    logger.info("enter checkStatus")

    if (checkData.hasOwnProperty("status")) {
        if (data.hasOwnProperty("status")) {
            status = (data.status == checkData.status)
        } else {
            status = checkData.status
        }
    }

    if (!status) {
        logger.info(checkData)
        logger.info(data)
    }

    logger.info("exit checkStatus")
    
    return status
}

function checkProperty(checkData, data) {
    let status = false
    logger.info("enter checkProperty")

    if (data.hasOwnProperty("property")) {
        let keys = Object.keys(data.property)
        logger.info("check property " + keys)

        for (let i = 0; i < keys.length; i++) {
            if (checkData.hasOwnProperty(keys[i])) {
                status  = eval("checkData." + keys[i] + " == data.property." + keys[i])
                if (!status) {
                    logger.error("check property " + keys[i] + " error")

                    break
                }
            } else {
                logger.error("can't get property " + keys[i] + " from checkData")

                status = false
                break
            }
        }
    }

    if (!status) {
        logger.info(checkData)
        logger.info(data)
    }

    logger.info("exit checkProperty")
    
    return status
}

function doDefaultCheck(checkData, data) {
    let status = true

    if (data.hasOwnProperty("checkType")) {
        checkTypes = data.checkType.split("|")

        for (let i = 0; i < checkTypes.length; i++) {
            let checkType = checkTypes[i].trim()

            if (checkData.hasOwnProperty(checkTypes[i]) || checkType == "property") {
                let functionName = "check" + checkType.substring(0,1).toUpperCase() + checkType.substring(1)

                status  = eval(functionName + "(checkData, data)")
                if (!status) {
                    logger.error("check type " + checkType + " work error")
                    break
                }
            } else {
                logger.info(checkData)
                logger.info(data)
                logger.error("data item not found " + checkType + " type")

                status = false
                break
            }
        }
    } else {
        logger.info("data item not found checkType property")
    }

    return status
}

function MDPlantLibTestSample(jsonFilePath, jsonDatasetName, doWork, doCheck=doDefaultCheck) {

    let dataset = loadJsonDataset(jsonFilePath, jsonDatasetName)
    if ((!dataset.hasOwnProperty("enable")) || dataset.enable) {
        logger.info("dataset title: " + dataset.title)
        for (let i = 0; i < dataset.sets.length; i++) {
            let data = dataset.sets[i]

            logger.info("----------------------start mdplant data item unit test--------------------------------- ")
            logger.info("data title: " + data.title)
            if ((!data.hasOwnProperty("enable")) || data.enable) {
                let checkData = doWork(data)
                let runFlag = doCheck(checkData, data)
                assert.equal(true, runFlag)
            } else {
                logger.info("skip data item: " + data.title)
            }

            logger.info("------------------------end mdplant data item unit test--------------------------------- ")
        }
    } else {
        logger.info("skip dataset: " + dataset.title)
    }
}

module.exports = {
    loadJsonDataset,
    MDPlantLibTestSample,
}
