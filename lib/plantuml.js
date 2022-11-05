function findIndexsWithSkip(level, start, end, contentArray, columnInterval, debug, skipLevel) {

    let indexs = []

    if (debug) {
        console.log("------------level " + level + " --------------")
        console.log("level = " + level)
        console.log("start = " + start)
        console.log("end = " + end)
        console.log("columnInterval = " + columnInterval)
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

function listToSequenceDiagramWithSkip(level, start, end, contentArray, columnInterval, debug, skipLevel, preActor=["actor"]) {
    if (debug) {
        console.log("------------level " + level + " --------------")
        console.log("level = " + level)
        console.log("start = " + start)
        console.log("end = " + end)
        console.log("columnInterval = " + columnInterval)

        for (let i = start; i < end - start; i++) {
            console.log(contentArray[i])
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
        console.log(preActor)

    // 因为传入的是包前不包后，排除第一行
    start += 1

    // 查找子索引数组
    let indexs = findIndexsWithSkip(level + 1, start, end, contentArray, columnInterval, debug, skipLevel)
    if (debug) {
        console.log("indexs:")
        console.log(indexs)
    }

    if (indexs.length > 0) {
        if (debug)
            console.log("-------padding space--------")
        // 额外添加的行缩进，目前是每个level添加2个空格，为了更方便的阅读，2 + 2 = 4 space
        for (let i = start; i < end; i++) {
            contentArray[i] = contentArray[i].substring(0, (2 * level + skipLevel) * columnInterval) + "  " + contentArray[i].substring((2 * level + skipLevel) * columnInterval)
            if (debug)
                console.log(contentArray[i])
        }

        if (debug)
            console.log("-------replace with | --------")
        // 绘制当前的标记的列，range是前闭后开，所以要+1，因为前面为每个level增加了2个空格，替换字符位置是(2 * level + 1) * columnInterval为基准
        for (let i = start; i < (indexs[indexs.length - 1] + 1); i++) {
            contentArray[i] = contentArray[i].substring(0, (2 * level + 1 + skipLevel) * columnInterval) + " " + contentArray[i].substring((2 * level + 1 + skipLevel) * columnInterval + 1)
            if (debug)
                console.log(contentArray[i])
        }

        if (debug)
            console.log("-------replace with └── /├──--------")
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
            console.log("-------recursion--------")
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
                console.log("-------start next recursion" + i + "--------")
                console.log("start = " + start)
                console.log("end = " + indexs[i])
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
            console.log("-------output--------")
            for (let i = 0; i < contentArray.length; i++) {
                console.log(contentArray[i])
            }
        }
    }
}


module.exports = {
    listToSequenceDiagramWithSkip,
}
