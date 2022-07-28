export function app(timer) {
  const {canvasEl, canvasCtx} = createCanvas();
  const videoEl = createVideo();

  document.body.appendChild(canvasEl);
  document.body.appendChild(videoEl);

  const timerInstance = timer();
  
  timerInstance.onTick((time) => {
    writeToCanvas(formatTime(time));
  });

  writeToCanvas(formatTime(timerInstance.seconds));

  timerInstance.start();


  /**
   * 
   * @param {Number} seconds 
   * @returns {String} MM:SS
   */
  function formatTime(seconds) {
    return new Date(seconds * 1000).toISOString().substring(14, 19)
  }

  function createCanvas() {
    const canvasEl = document.createElement('canvas');
    const canvasCtx = canvasEl.getContext('2d');
    canvasCtx.font = '52px serif';
    canvasCtx.textAlign = 'center';
    canvasCtx.fillStyle = "#59FFA0";
    return {canvasEl, canvasCtx};
  }

  function createVideo() {
    const videoEl = document.createElement('video');
    videoEl.muted = true;
    videoEl.srcObject = canvasEl.captureStream();
    return videoEl;
  }

  /**
   * 
   * @param {string} text 
   * @returns 
   */
  function writeToCanvas(text) {
    if(!canvasCtx) return;
    canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    canvasCtx.fillText(text, canvasEl.width / 2, canvasEl.height / 2);
  }
}

export function timer() {
  const tickCallbacks = new Set();
  let interval = null;

  return {
    seconds: 25 * 60,
    start() {
      interval = setInterval(() => {
        this.seconds--;
        if(this.seconds === 0) {
          this.stop();
        }
        this._tick(this.seconds);
      }, 1000);
    },
    stop() {
      clearInterval(interval);
      interval = null;
      this.seconds = 25 * 60;
      this._tick(this.seconds);
    },
    pause() {
      clearInterval(interval);
      interval = null;
    },
    /**
     * 
     * @param {Function} callbackFn 
     */
    onTick(callbackFn) {
      tickCallbacks.add(callbackFn);
    },
    /**
     * 
     * @param {Number} seconds
     */
    _tick(seconds) {
      tickCallbacks.forEach(cb => cb(seconds));
    },
  }
}