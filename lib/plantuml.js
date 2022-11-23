const plantumlEncoder = require('plantuml-encoder')
const http = require('http')
const fs = require('fs')
const loggerjs = require("./logger")

const logger = new loggerjs.Logger("plantuml")

function findIndexsWithSkip(level, start, end, contentArray, columnInterval, debug, skipLevel) {

    let indexs = []

    if (debug) {
        logger.debug("------------level " + level + " --------------")
        logger.debug("level = " + level)
        logger.debug("start = " + start)
        logger.debug("end = " + end)
        logger.debug("columnInterval = " + columnInterval)
    }

    for (let i = start; i < end; i++) {
        // level * columnInterval: 当前行本身缩进
        // (level - 1) * columnInterval: 额外添加的行缩进，目前是每个level添加2个空格，为了更方便的阅读
        let line = contentArray[i]
        if (level > 0) {
            if (line.length > ((level + skipLevel) * columnInterval) && line[(2 * level - 1 + skipLevel) * columnInterval] == "*") {
                indexs.push(i)
            }
        } else {    // level <= 0
            level = 0
            if (line.length > 0 && line[0] == "*") {
                indexs.push(i)
            }
        }
    }

    return indexs
}

/**
 * 
 * @param {number} level 
 * @param {number} start 
 * @param {number} end 
 * @param {string[]} contentArray 
 * @param {number} columnInterval 
 * @param {boolean} debug 
 * @param {number} skipLevel 
 * @param {string[]} preActor 
 * @returns 
 */
function listToSequenceDiagramWithSkip(level, start, end, contentArray, columnInterval, debug, skipLevel, preActor=["actor"]) {
    if (debug) {
        logger.debug("------------level " + level + " --------------")
        logger.debug("level = " + level)
        logger.debug("start = " + start)
        logger.debug("end = " + end)
        logger.debug("columnInterval = " + columnInterval)

        for (let i = start; i < end - start; i++) {
            logger.debug(contentArray[i])
        }
    }

    let changeActor = false
    let filePathRegex = new RegExp("([^/ ]+.(c|h|cpp|java|py|rc))\\s*$", "g")
    let tableMatchValue = filePathRegex.exec(contentArray[start])
    if (tableMatchValue != null && tableMatchValue[1].length != 0) {
        preActor.push(tableMatchValue[1])
        changeActor = true
    }

    if (debug)
        logger.debug(preActor)

    // 因为传入的是包前不包后，排除第一行
    start += 1

    // 查找子索引数组
    let indexs = findIndexsWithSkip(level + 1, start, end, contentArray, columnInterval, debug, skipLevel)
    if (debug) {
        logger.debug("indexs:")
        logger.debug(indexs)
    }

    if (indexs.length > 0) {
        if (debug)
            logger.debug("-------padding space--------")
        // 额外添加的行缩进，目前是每个level添加2个空格，为了更方便的阅读，2 + 2 = 4 space
        for (let i = start; i < end; i++) {
            contentArray[i] = contentArray[i].substring(0, (2 * level + skipLevel) * columnInterval) + "  " + contentArray[i].substring((2 * level + skipLevel) * columnInterval)
            if (debug)
                logger.debug(contentArray[i])
        }

        if (debug)
            logger.debug("-------replace with | --------")
        // 绘制当前的标记的列，range是前闭后开，所以要+1，因为前面为每个level增加了2个空格，替换字符位置是(2 * level + 1) * columnInterval为基准
        for (let i = start; i < (indexs[indexs.length - 1] + 1); i++) {
            contentArray[i] = contentArray[i].substring(0, (2 * level + 1 + skipLevel) * columnInterval) + " " + contentArray[i].substring((2 * level + 1 + skipLevel) * columnInterval + 1)
            if (debug)
                logger.debug(contentArray[i])
        }

        if (debug)
            logger.debug("-------replace with └── /├──--------")
        // 绘制当前标记的行，由于需要替换掉*号，所以行范围需要range内要+1，由于前面额外的每个level添加了2个空格，所以要以(2 * level + 1) * columnInterval为基准
        indexs.forEach(value => {
            for(i = 0; i < columnInterval; i++){
                if (i == 0) {
                    contentArray[value] = contentArray[value].substring(0, (2 * level + 1 + skipLevel) * columnInterval) + "   " + contentArray[value].substring((2 * level + 1 + skipLevel) * columnInterval + 3)
                } else if (i == 1) {
                    if (changeActor) {
                        contentArray[value] = contentArray[value].substring(0, (2 * level + 1 + skipLevel) * columnInterval) + preActor[preActor.length - 2] + " -> " + preActor[preActor.length - 1] + " : " + contentArray[value].substring((2 * level + 1 + skipLevel) * columnInterval + 3)

                    } else {
                        contentArray[value] = contentArray[value].substring(0, (2 * level + 1 + skipLevel) * columnInterval) + preActor[preActor.length - 1] + " -> " + preActor[preActor.length - 1] + " : " + contentArray[value].substring((2 * level + 1 + skipLevel) * columnInterval + 3)
                    }
                }
            }
        })

        if (debug)
            logger.debug("-------recursion--------")
        /**
         * 1. 当前递归的区域的最后一行放入indexs集合，当作结束范围，这样就可以囊括整个子区域
         * 2. 示例 1，不用添加最后一行
         *      * indent 1
         *        * indent 2
         *      * indent 1
         *      * indent 1
         * 3. 示例 2，需要添加最后一行
         *      * indent 1
         *        * indent 2
         *      * indent 1
         *        * indent 2
         *        * indent 2
         *    -> 这个位置就是：indexs.push(end) <-
         * 4. 综上两个示例，统一添加最后一行，在内部判断start、end不相等才递归
         */
        indexs.push(end)

        for (let i = 0; i < indexs.length; i++) {
            if (debug) {
                logger.debug("-------start next recursion" + i + "--------")
                logger.debug("start = " + start)
                logger.debug("end = " + indexs[i])
            }

            // skip start == end
            if (start != indexs[i]) {
                if (changeActor) {
                    if (contentArray[indexs[i]] == undefined) {         // out of index
                        contentArray[indexs[i]] = "<<enterspace_start>>" + preActor[preActor.length - 1] + " -> " + preActor[preActor.length - 2] + "<<enterspace_end>>"
                    } else {
                        contentArray[indexs[i]] = "<<enterspace_start>>" + preActor[preActor.length - 1] + " -> " + preActor[preActor.length - 2] + "<<enterspace_end>>" + contentArray[indexs[i]]
                    }
                }

                listToSequenceDiagramWithSkip(level + 1, start, indexs[i], contentArray, columnInterval, debug, skipLevel, preActor.slice())
            } 

            // 下一个子区域
            start = indexs[i]
        }
    } else
        return

    if (debug) {
        if (level == 0) {
            logger.debug("-------output--------")
            for (let i = 0; i < contentArray.length; i++) {
                logger.debug(contentArray[i])
            }
        }
    }
}

/**
 * 
 * @param {string[]} contentArray 
 * @param {number} skipLevel 
 * @returns 
 */
function convert2SequenceDiagram(contentArray, skipLevel) {
    listToSequenceDiagramWithSkip(0, 0, contentArray.length, contentArray, 2, false, skipLevel)

    for (let i = 1; i < contentArray.length; i++) {
        let filePathRegex = new RegExp("([^/ ]+.(c|h|cpp|java|py|rc))\\s*$", "g")
        let tableMatchValue = filePathRegex.exec(contentArray[i])
        if (tableMatchValue != null && tableMatchValue[1].length != 0) {
            continue
        } else {
            contentArray[i] = contentArray[i].replace(/<<enterspace_start>>/g, "").replace(/<<enterspace_end>>/g, "\n").trim()
        }
    }

    let outputArray = []
    contentArray.join("\n").split("\n").forEach(value => {
        let filePathRegex = new RegExp("([*:]\\s*[^/ ]+.(c|h|cpp|java|py|rc))\\s*$", "g")
        let tableMatchValue = filePathRegex.exec(value)
        if (tableMatchValue != null && tableMatchValue[1].length != 0) {
            logger.debug(value)
        } else {
            outputArray.push(value.trim())
        }
    })

    // outputArray.splice(0, 1)

    return {"status": true, "content": outputArray.join("\n")}
}

/**
 * 
 * @param {string} umlString 
 * @param {string} plantumlServer 
 * @param {string} suffix 
 * @param {string} outputPath 
 * @param {(status: boolean) => void} cb 
 */
function getHTTPPlantumlImage(umlString, plantumlServer, suffix, outputPath, cb) {
    let umlEncoded = plantumlEncoder.encode(umlString)

    function callback(err, cb, status) {
        if (!status)
            logger.debug(err)

        if (cb != undefined)
            cb(status)
    }

    http.get(plantumlServer + '/' + suffix +  '/' + umlEncoded, (res) =>{
        let datas = []
        let size = 0

        res.on("data", (data) => {
            datas.push(data)
            size += data.length
        })

        res.on("end", () => {
            try {
                fs.createWriteStream(outputPath).write(Buffer.concat(datas, size))
                callback("", cb, true)
            } catch(err) {
                callback(err, cb, false)
            }
        })

        res.on("error", (err) => {
            callback(err, cb, false)
        })
    }).on("error", (err) => {
        callback(err, cb, false)
    })
}

/**
 * 
 * @param {string[]} textBlock 
 * @param {string} rootPath 
 * @param {number} cursorOffset 
 * @returns 
 */
function isPlantuml(textBlock, rootPath, cursorOffset) {
    let found = false
    let type = ""

    logger.debug("enter isPlantuml")

    if (textBlock[cursorOffset].trim().length == 0)
        return found

    if (textBlock[0].trim().startsWith("```plantuml")) {
        logger.debug("plantuml block found")
        found = true
    }

    return {"status": found, "content": type}
}

module.exports = {
    convert2SequenceDiagram,
    getHTTPPlantumlImage,
    isPlantuml,
}
