/**
 * @param {string} imagePath
 * @returns {{status: boolean, reason: string}}
 *
 * use applescript to save image from clipboard and get file path
 */
export function saveClipboardImage(imagePath: string): {
    status: boolean;
    reason: string;
};
