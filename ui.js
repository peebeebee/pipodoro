export class UI {
  #painter
  #player
  #startButton
  #pauseButton

  /**
   * @param {Object} parameters
   * @param {HTMLVideoElement} parameters.video
   * @param {HTMLButtonElement} parameters.startButton
   * @param {HTMLButtonElement} parameters.pauseButton
   * @param {HTMLButtonElement} parameters.pipButton
   */
  constructor({video, startButton, pauseButton, pipButton}) {
    this.#painter = new Painter();
    this.#player = new Player(this.#painter, video);
    this.#startButton = startButton;
    this.#pauseButton = pauseButton;
    this.setup();
  }

  setup() {
    this.#toggle(this.#pauseButton, false);
  }

  setStart() {
    this.#toggle(this.#startButton, false);
    this.#toggle(this.#pauseButton, true);
  }

  setPause() {
    this.#toggle(this.#startButton, true);
    this.#toggle(this.#pauseButton, false);
  }

  popout() {
    this.#player.popout();
  }

  /** 
   * @param {number} seconds 
   **/
  setTime(seconds) {
    this.#painter.paint(this.#formatTime(seconds));
  }

  /**
   * 
   * @param {Number} seconds 
   * @returns {String} MM:SS
   */
  #formatTime(seconds) {
    return new Date(seconds * 1000).toISOString().substring(14, 19)
  }

  #toggle(button, show) {
    button.style.display = show ? 'block' : 'none';
  }
}

class Player {

  #video
  #isPip = false;

  /**
   * @param {HTMLVideoElement} video
   * @param {Painter} painter
   */
  constructor(painter, video) {
    video.muted = true;
    video.controls = false;
    video.srcObject = painter.stream;
    // video.play();
    this.#video = video;
  }

  popout() {
    if(this.#isPip) {
      document.exitPictureInPicture();
    } else {
      this.#video.requestPictureInPicture();
    }
    this.#isPip = !this.#isPip;
  }
}

class Painter {

  #canvas
  #ctx
  stream;

  constructor() {
    const canvas = document.createElement('canvas');

    canvas.width = 3840;
    canvas.height = 2160;
    
    canvas.style.display = 'none';
    
    this.#canvas = canvas;
    this.#ctx = canvas.getContext('2d');
    this.stream = canvas.captureStream();
  }

  /**
   * 
   * @param {string} text 
   * @returns void
   */
  paint(text) {
    const ctx = this.#ctx;
    const cv = this.#canvas;

    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = '1000px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, cv.width / 2, cv.height / 2 + ctx.measureText(text).actualBoundingBoxAscent / 2);
  }
}