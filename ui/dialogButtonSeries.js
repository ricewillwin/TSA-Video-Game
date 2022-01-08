import { k } from "./../kaboom.js";
import { ButtonSeries } from "./buttonSeries.js";
import { DialogButton } from "./dialogButton.js";

export const buttonSpacing = 50;

export class DialogButtonSeries extends ButtonSeries {
  /**
   * Create a dialog-specific ButtonSeries
   * @param {...Object} buttonComps objects containing a "text" and "dialog" parameter
   */
  constructor(...buttonComps) {
    let buttons = [];
    for (let i = 0; i < buttonComps.length; i++) {
      buttons.push(new DialogButton({
        text: buttonComps[i].text,
        x: k.height()/2,
        y: k.width() - buttonSpacing/2 - buttonSpacing * i,
      }, buttonComps[i].dialog));
    }
    super(buttons, 0);
  }
}

export class UncreatedDialogButtonSeries {
  #buttonComps = null;
  constructor(...buttonComps) {
    this.#buttonComps = buttonComps;
  }

  create() {
    return new DialogButtonSeries(this.#buttonComps);
  }
}
