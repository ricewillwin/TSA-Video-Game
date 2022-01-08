import { k } from "./../kaboom.js";
import { Button } from "./button.js";

export class DialogButton extends Button {
  /**
   *
   * @param {Dialog} currentDialog
   * @param {string=} name
   * @param {string} text
   * @param {number} x
   * @param {number} y
   * @param {number=} scale
   * @param {[number, number, number]=} textColor
   * @param {[number, number, number]=} buttonColor
   * @param {number=} padding
   * @param {Dialog} nextDialog
   */
  constructor(currentDialog, { name, text="", x, y, scale, textColor, buttonColor, padding }, nextDialog) {
    super({ name, text, x, y, scale, textColor, buttonColor, padding }, () => {
      currentDialog.nextDialog = nextDialog;
    });
  }
}
