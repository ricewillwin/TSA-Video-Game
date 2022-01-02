import { k } from "../kaboom.js";
import { Button } from "./button.js";

/**
 * @classdesc handler for multiple buttons that takes care of scrolling through the options.
 */
export class ButtonSeries {
  #buttons = [];
  #idx = 0;

  /**@constructor
   * Constructor for {@link ButtonSeries}.
   * @param {Button[]} buttons array of buttons to add
   * @param {number=} start idx of the starting button; default 0
   */
  constructor(buttons, start = 0) {
    this.#buttons = buttons;
    this.choose(start);
  };

  /**
   * Gets currently selected {@link Button}.
   * @returns {Button} currently selected button
   */
  get curr() {
    return this.buttonAt(this.#idx, false);
  }

  /**
   * Gets button just before currently selected {@link Button}.
   * @returns {Button} previous button
   */
  get prev() {
    return this.buttonAt(this.#idx - 1, true);
  }

  /**
   * Gets button just after currently selected {@link Button}.
   * @returns {Button} next button
   */
  get next() {
    return this.buttonAt(this.#idx + 1, true);
  }

  /**
   * Validates a given index.
   * @param {number} idx index to check
   * @param {boolean} allowOverflow whether or not to wrap index if it is out of range
   * @returns {number} validated index, wrapped if necessary and allowOverflow was true
   * @throws {TypeError} if given index is not an integer
   * @throws {RangeError} if allowOverflow is false and the index is out of range
   */
  validIdx(idx, allowOverflow) {
    if (!Number.isInteger(idx)) {
      throw new TypeError("index of button must be an integer.");
    }
    if (allowOverflow ?? false) {
      return (idx + this.#buttons.length)%this.#buttons.length;
    }
    else {
      if (idx < 0 || idx >= this.#buttons.length) {
        throw new RangeError("chosen index is outside of possible values, and overflow has not been allowed.");
      }
      else {
        return idx;
      }
    }
  }

  /**
   * Returns {@link Button} at a given index.
   * @param {number} idx index of button to access
   * @param {boolean} allowOverflow whether to wrap index if out of range
   * @returns {Button} button at given index
   * @throws {TypeError} if given index is not an integer
   * @throws {RangeError} if allowOverflow is false and the index is out of range
   */
  buttonAt(idx, allowOverflow) {
    return this.#buttons[this.validIdx(idx, allowOverflow)];
  }

  /**
   * Moves the chosen button forward one; returns to beginning if current button is the last
   */
  fwd() {
    this.choose(this.#idx + 1, true);
  }

  /**
   * Moves the chosen button back one; jumps to end if current button is the first
   */
  back() {
    this.choose(this.#idx - 1, true);
  }

  /**
   * Jump to another button and choose it.
   * @param {number} idx index of button to move to
   * @param {boolean=} allowOverflow whether to wrap index if it is out of range
   */
  choose(idx, allowOverflow) {
    this.curr.selected = false;
    this.#idx = this.validIdx(idx, allowOverflow);
    this.curr.selected = true;
  }

  /**
   * Push the currently selected button.
   * @see {@link Button#push}
   */
  push() {
    this.curr.push();
  }
}
