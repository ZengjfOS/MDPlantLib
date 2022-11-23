/**
 * @param {string} imagePath
 * @returns
 *
 * use applescript to save image from clipboard and get file path
 */
export function saveClipboardImage(imagePath: string): {
    status: boolean;
    content: any;
};
