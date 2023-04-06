/**
 * @param {Object} obj - An object.
 * @param {HTMLButtonElement} obj.startButton .
 * @param {HTMLButtonElement} obj.settingsButton
 * @param {HTMLVideoElement} obj.video
 */
export function ui({startButton, video}) {
  const {canvas, canvasCtx} = setupCanvas();

  /** @type {Function} */
  let startCallback = () => null;

  setupVideo();
  setupButtons();

  return {
    setTime,
    onStart,
  }

  /**
   * @param {Function} callback 
   **/
  function onStart(callback) {
    startCallback = callback;
  }

  /** 
   * @param {number} seconds 
   **/
  function setTime(seconds) { 
    writeToCanvas(formatTime(seconds));
  }

  function setupCanvas() {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    const canvasCtx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    return {canvas, canvasCtx};
  }

  function setupVideo() {
    video.muted = true;
    video.controls = true;
    video.srcObject = canvas.captureStream();
    video.play();
  }

  function setupButtons() {
    startButton.addEventListener('click', () => startCallback());
  }

  /**
   * 
   * @param {Number} seconds 
   * @returns {String} MM:SS
   */
   function formatTime(seconds) {
    return new Date(seconds * 1000).toISOString().substring(14, 19)
  }

  /**
   * 
   * @param {string} text 
   * @returns 
   */
  function writeToCanvas(text) {
    if(!canvasCtx) return;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = "#FFFFFF";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = "#59FFA0";
    canvasCtx.font = '52px sans-serif';
    canvasCtx.textAlign = 'center';
    canvasCtx.fillText(text, canvas.width / 2, canvas.height / 2);
  }
}