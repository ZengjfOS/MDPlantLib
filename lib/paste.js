const path = require("path")
const child_process = require("child_process")
/**
 * use applescript to save image from clipboard and get file path
 */
function saveClipboardImageToFileAndGetPath(imagePath, cb) {
    if (!imagePath) return;

    let platform = process.platform;
    if (platform === 'win32') {
        // Windows
        const scriptPath = path.join(__dirname, './res/paste/pc.ps1');

        let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
        let powershellExisted = fs.existsSync(command)
        if (!powershellExisted) {
            command = "powershell"
        }

        const powershell = child_process.spawn(command, [
            '-noprofile',
            '-noninteractive',
            '-nologo',
            '-sta',
            '-executionpolicy', 'unrestricted',
            '-windowstyle', 'hidden',
            '-file', scriptPath,
            imagePath
        ]);
        powershell.on('error', function (e) {
            console.log(e);
        });
        powershell.on('exit', function (code, signal) {
            // console.log('exit', code, signal);
        });
        powershell.stdout.on('data', function (data) {
            cb(imagePath, data.toString().trim());
        });
    }
    else if (platform === 'darwin') {
        // console.log("darwin")
        // Mac
        let scriptPath = path.join(__dirname, './res/paste/mac.applescript');
        // console.log(scriptPath)

        let ascript = child_process.spawn('osascript', [scriptPath, imagePath]);
        ascript.on('error', function (e) {
            console.log(e)
        });
        ascript.on('exit', function (code, signal) {
            // console.log('exit',code,signal);
        });
        ascript.stdout.on('data', function (data) {
            cb(imagePath, data.toString().trim());
        });
    } else {
        // Linux 

        let scriptPath = path.join(__dirname, './res/paste/linux.sh');

        let ascript = child_process.spawn('sh', [scriptPath, imagePath]);
        ascript.on('error', function (e) {
            console.log(e)
        });
        ascript.on('exit', function (code, signal) {
            // console.log('exit',code,signal);
        });
        ascript.stdout.on('data', function (data) {
            let result = data.toString().trim();
            if (result == "no xclip") {
                console.log('You need to install xclip command first.');
                return;
            }
            cb(imagePath, result);
        });
    }
}

module.exports = {
    saveClipboardImageToFileAndGetPath,
}
