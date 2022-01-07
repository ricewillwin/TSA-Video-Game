import { k } from "./../kaboom.js";
import { Button } from "./button.js";

export class DialogButton extends Button {
  #dialog = null;
  
  constructor({ name, text="", x, y, scale=defaultScale, textColor=defaultTextColor, buttonColor=defaultFillColor, padding=defaultPadding }, dialog) {
    super({ name ?? text, text, x, y, scale, textColor, buttonColor, padding }, () => {
      return dialog;
    })
  }
}
