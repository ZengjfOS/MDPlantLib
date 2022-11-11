const path = require("path")
const child_process = require("child_process")

function formatScriptOutput(scriptOutput) {
    if (scriptOutput.status == 0 || scriptOutput.exitCode == null) {
        if (scriptOutput.stdout.toString() == "no xclip") {
            return {"status": false, "reason": "xclip not found"}
        } else if (scriptOutput.stdout.toString().trim() == "no image") {
            return {"status": false, "reason": "no image"}
        } else {
            return {"status": true, "reason": ""}
        }
    }

    return {"status": false, "reason": scriptOutput.stderr.toString()}
}

/**
 * @param {string} imagePath
 * 
 * use applescript to save image from clipboard and get file path
 */
function saveClipboardImage(imagePath) {
    let ascript;

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
        // console.log(scriptPath)
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
