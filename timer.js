const tickCallbacks = new Set();
let interval = null;

function _tick(seconds) {
  tickCallbacks.forEach(cb => cb(seconds));
}

export const timer = {
  seconds: 25 * 60,

  start() {
    interval = setInterval(() => {
      this.seconds--;
      if(this.seconds === 0) {
        this.stop();
      }
      _tick(this.seconds);
    }, 1000);
  },

  stop() {
    clearInterval(interval);
    interval = null;
    this.seconds = 25 * 60;
    _tick(this.seconds);
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
    return this;
  }
}