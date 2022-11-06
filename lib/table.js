const fs = require('fs');

function charNum(str){
    // 中文
    var re = /[\u4E00-\u9FA5]/g
    // 中文标点
    var reg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g
    var hanziNum = 0
    var biaodianNum = 0
    var value = str
    if(value.match(re)!=null){
        hanziNum = value.match(re).length
    }
    if(value.match(reg)!=null){
        biaodianNum =  value.match(reg).length
    }

    //中文字及符号均为两个字节
    return value.length + hanziNum + biaodianNum
}

function convertJSON2Table(configPath, table) {
    let outputString = ""

    try {
        const data = fs.readFileSync(configPath, 'utf8');

        // parse JSON string to JSON object
        const config = JSON.parse(data);
        tablePoint = eval('config.' + table)
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
        return ""
    }

    if (tablePoint.hasOwnProperty("title") && tablePoint.hasOwnProperty("datas")) {

        let countColume = 0
        tablePoint.title.forEach(element => {
            countColume++
            if (countColume == tablePoint.title.length)
                outputString += element
            else
                if (countColume == 1)
                    outputString += element + "  | "
                else
                    outputString += element + " | "
        })
        outputString += "\n"

        for (i = 0; i < countColume; i ++) {
            if (i == (countColume - 1))
                outputString += "".padStart(charNum(tablePoint.title[i]) + 3, "-")
            else
                outputString += "|".padStart(charNum(tablePoint.title[i]) + 3, "-")
        }
        outputString += "\n"

        let countRow = 1
        tablePoint.datas.forEach(e => {
            countColume = 0
            e.forEach(element => {
                if (typeof(element) == "string") {
                    if (element == "*")
                        outputString += ("" + countRow).padStart(4, "0") + " | "
                    else {
                        outputString += element + " | "
                    }
                }

                if (Array.isArray(element)) {
                    let linkCount = 1

                    element.forEach(link => {
                        if (link.hasOwnProperty("title") && link.hasOwnProperty("link")) {
                            if (linkCount == element.length)
                                outputString += "* [" + link.title+ "](" + link.link + ")"
                            else
                                outputString += "* [" + link.title+ "](" + link.link + ")<br> "
                        }

                        linkCount++
                    })
                } else if (typeof(element) == "object") {
                    if (element.hasOwnProperty("title") && element.hasOwnProperty("link")) {
                        outputString += "[" + element.title+ "](" + element.link + ")"
                    }
                }

                countColume++
            })

            outputString += "\n"
            countRow++
        })

        return outputString.substring(0, outputString.length - 1)
    } else
        return outputString
}

function convertRowColume2Table(lineValue) {
    let tableRegex = new RegExp("\\s*table[\\s:]*(\\d*)[x\\s*]*(\\d*)\\s*")
    let outputString = ""

    let tableMatchValue = tableRegex.exec(lineValue)
    if (tableMatchValue != null) {

        for (let row = 0; row < Number(tableMatchValue[1]) + 2; row++) {
            for (let col = 0; col < Number(tableMatchValue[2]); col++) {
                if (row == 0) {
                    if (col == 0) {
                        outputString += " NO. "
                    } else {
                        outputString += "col " + (col + 1)
                    }

                    if (col != (Number(tableMatchValue[2]) - 1)) {
                        outputString += " | "
                    }
                }

                if (row == 1) {
                    outputString += "-----"

                    if (col != (Number(tableMatchValue[2]) - 1)) {
                        outputString += "-|-"
                    }
                }

                if (row > 1) {

                    if (col == 0) {
                        outputString += (" " + ((row - 2) + 1)).padEnd(5, ' ')
                    } else {
                        outputString += "     "
                    }

                    if (col != (Number(tableMatchValue[2]) - 1)) {
                        outputString += " | "
                    }
                }
            }

            if (row != Number(tableMatchValue[1]) + 2 - 1)
                outputString += "\n"
        }

        return outputString.substring(0, outputString.length - 1)
    } else
        return outputString
}


function convert2Table(lineValue) {
    let tableRowColumeRegex = new RegExp("\\s*table[\\s:]*(\\d*)[x\\s*]*(\\d*)\\s*", "g")
    let tableJSONRegex = new RegExp("\\s*table[\\s:]*([\\w\\/]*\\.json)", "g")

    let tableMatchValue = tableRowColumeRegex.exec(lineValue)
    if (tableMatchValue != null && tableMatchValue[1].length != 0 && tableMatchValue[2].length != 0) {
        // console.log("row colume: " + tableMatchValue)
        return convertRowColume2Table(lineValue)
    }

    tableMatchValue = tableJSONRegex.exec(lineValue)
    if (tableMatchValue != null) {
        // console.log("json: " + tableMatchValue)
        return convertJSON2Table(tableMatchValue[1], "table")
    }
}

module.exports = {
    convertJSON2Table,
    convertRowColume2Table,
    convert2Table
}
