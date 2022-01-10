import { k } from "../kaboom.js";

const defaultPadding = 15;
const defaultTextColor = [255, 255, 255];
const defaultFillColor = [30, 30, 30];
const defaultScale = 1;
const normalOutline = [ 2, k.rgb(50, 50, 50) ]
const selectedOutline = [ 3, k.rgb(0, 255, 0) ];

/**
 * @classdesc Handles the text and fill objects associated with the button.
 */
export class Button {
  #buttonText = null;
  #buttonFill = null;
  #enabled = true;
  #onPush = () => {};
  #scale = defaultScale;
  #name;
  #listeners = [];

  /**@constructor
   * Creates a button with given parameters.
   * @param {string} name component names; both will be tagged with "nameButton", and each will be tagged with
   *   "nameButtonText" and "nameButtonFill" accordingly.
   * @param {string=} text text to display on button; defaults to name
   * @param {number} x x-coordinate of the button center
   * @param {number} y y-coordinate of the button center
   * @param {number=} scale scale value for both objects
   * @param {[number, number, number]=} textColor array of RGB values (0-255) of text color
   * @param {[number, number, number]=} buttonColor array of RGB values (0-255) of button color
   * @param {number=} padding padding of button around text; defaults to {@link defaultPadding}
   * @param {Function} onPush function to call when button is activated
   * @param {boolean=} enabled whether the button will activate when pushed
   * @param {number=} fixedWidth
   * @throws ReferenceError
   */
  constructor({ name, text="", x, y, scale=defaultScale, textColor=defaultTextColor, buttonColor=defaultFillColor, padding=defaultPadding, fixedWidth }, onPush, enabled=true) {
    this.#scale = scale;
    let textObjComps = [
      k.layer("ui"),
    ];
    try {
      textObjComps.push(k.text(text === "" ? name : text));
      this.#name = name;
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.log(e.message)
        throw new ReferenceError("name is a required parameter and must be defined as a string.");
      } else {
        throw e;
      }
    }
    textObjComps = textObjComps.concat([
      k.z(100001),
      k.scale(scale),
      k.color(...textColor),
      k.origin("center"),
      k.fixed(),
    ]);
    try {
      textObjComps.push(k.pos(x, y));
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.log(e.message)
        throw new ReferenceError("x and y are required parameters and must be defined as numbers.");
      } else {
        throw e;
      }
    }
    textObjComps.push(`${name}Button`);
    textObjComps.push(`${name}ButtonText`);
    textObjComps.push("buttonText");

    this.#buttonText = k.add(textObjComps);

    let fillObjComps = [
      k.rect(fixedWidth !== undefined ? fixedWidth/scale : (this.#buttonText.width + padding), this.#buttonText.height + padding),
      k.layer("ui"),
      k.scale(scale),
      k.z(100000),
      k.color(...buttonColor),
      k.outline(...normalOutline),
      k.origin("center"),
      k.area(),
      k.fixed(),
      k.pos(x, y),
      `${name}Button`,
      `${name}ButtonFill`,
      "buttonFill",
    ];

    this.#buttonFill = k.add(fillObjComps);

    this.#onPush = onPush;
    this.#enabled = enabled;
  }

  /**
   *
   * @returns {boolean} boolean indicating whether the button will activate when pressed
   */
  get enabled() {
    return this.#enabled;
  }

  /**
   *
   * @param {boolean} enabled whether the button will activate when pressed
   */
  set enabled(enabled) {
    this.#enabled = enabled;
  }

  /**
   * Changes the outline based on whether the button is selected or not.
   * @param {boolean} selected whether the button is currently selected
   */
  set selected(selected) {
    if (selected) {
      this.#buttonFill.unuse("outline");
      this.#buttonFill.use(k.outline(...selectedOutline));
      this.#listeners.push(this.#buttonText.onUpdate(() => {
        this.#buttonText.scale = k.wave(0.99*this.#scale, 1.05*this.#scale, k.time() * 1.5);
      }));
      this.#listeners.push(this.#buttonFill.onUpdate(() => {
        this.#buttonFill.scale = k.wave(0.99*this.#scale, 1.05*this.#scale, k.time() * 1.5);
      }));
    }
    else {
      this.#buttonFill.unuse("outline");
      this.#buttonFill.use(k.outline(...normalOutline))
      this.#buttonText.scale = this.#scale;
      this.#buttonFill.scale = this.#scale;
      for (const idx in this.#listeners) {
        this.#listeners[idx]();
      }
    }
  }

  /**
   * Activates button if the button is enabled.
   */
  push() {
    if (this.#enabled) {
      this.#onPush();
    }
  }

  destroy() {
    this.#buttonFill.destroy();
    this.#buttonText.destroy();
    return this;
  }
}
