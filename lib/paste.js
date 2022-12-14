const path = require("path")
const child_process = require("child_process")
const loggerjs = require("./logger")
const fs = require("fs")

const logger = new loggerjs.Logger("paste")

function formatScriptOutput(scriptOutput) {
    if (scriptOutput.status == 0 || scriptOutput.exitCode == null) {
        if (scriptOutput.stdout.toString() == "no xclip") {
            return {"status": false, "content": "xclip not found"}
        } else if (scriptOutput.stdout.toString().trim() == "no image") {
            return {"status": false, "content": "no image at clipboard"}
        } else {
            return {"status": true, "content": ""}
        }
    }

    return {"status": false, "content": scriptOutput.stderr.toString()}
}

/**
 * @param {string} imagePath
 * @returns 
 * 
 * use applescript to save image from clipboard and get file path
 */
function saveClipboardImage(imagePath) {
    let ascript

    if (!imagePath) return

    let platform = process.platform
    if (platform === 'win32') {
        // Windows
        const scriptPath = path.join(__dirname, './res/paste/pc.ps1')

        let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
        let powershellExisted = fs.existsSync(command)
        if (!powershellExisted) {
            command = "powershell"
        }

        ascript = child_process.spawnSync(command, [
            '-noprofile',
            '-noninteractive',
            '-nologo',
            '-sta',
            '-executionpolicy', 'unrestricted',
            '-windowstyle', 'hidden',
            '-file', scriptPath,
            imagePath
        ])
    }
    else if (platform === 'darwin') {
        // MAC
        let scriptPath = path.join(__dirname, './res/paste/mac.applescript')
        // logger.debug(scriptPath)
        ascript = child_process.spawnSync('osascript', [scriptPath, imagePath])

    } else {
        // Linux
        let scriptPath = path.join(__dirname, './res/paste/linux.sh')
        ascript = child_process.spawnSync('sh', [scriptPath, imagePath])
    }

    return formatScriptOutput(ascript)
}

module.exports = {
    saveClipboardImage,
}
