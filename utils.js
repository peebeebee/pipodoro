/**
 * 
 * @param {string} str - convert mm:ss to seconds
 */
export function convertStringToSeconds(str) {
    const [minutes, seconds] = str.split(':').map(Number);
    return minutes * 60 + seconds || 0;
}
