export class App {

  #ui
  #timer

  /**
   * @param {import('./ui').UI} ui 
   * @param {import('./timer').timer} timer 
   */
  constructor(ui, timer) {
    ui.setTime(timer.seconds);
    timer.onTick((time) => ui.setTime(time));

    this.#timer = timer;
    this.#ui = ui;
  }

  start() {
    this.#ui.setStart();
    this.#timer.start();
  }

  pause() {
    this.#ui.setPause();
    this.#timer.pause();
  }

  popout() {
    this.#ui.popout();
  }
}
