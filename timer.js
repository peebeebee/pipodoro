export class Timer extends EventTarget {

  seconds;
  #interval = null;

  constructor({seconds}) {
    super();
    this.seconds = seconds;
  }

  start() {
    this.#interval = setInterval(() => {
      this.seconds--;
      if(this.seconds === 0) {
        this.stop();
      }
      this.#tick(this.seconds);
    }, 1000);
  }

  stop() {
    clearInterval(this.#interval);
    this.#interval = null;
    this.seconds = 25 * 60;
    this.#tick(this.seconds);
  }

  pause() {
    clearInterval(this.#interval);
    this.#interval = null;
  }

  #tick(seconds) {
    this.dispatchEvent(new CustomEvent('tick', {detail: seconds}));
  }
}