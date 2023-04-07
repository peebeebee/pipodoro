export class UI {
  #painter

  /**
   * @param {Object} parameters
   * @param {HTMLVideoElement} parameters.video
   */
  constructor({video}) {
    this.#painter = new Painter();
    video.srcObject = this.#painter.stream;
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
}

class Painter {

  stream;
  #canvas
  #ctx

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