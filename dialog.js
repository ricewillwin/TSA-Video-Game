import { k } from "./kaboom.js"
import { setChoiceListeners } from "./input.js";

export class DialogPart {
  _speaker = null;
  _type;

  constructor(speaker, type) {
    this._speaker = speaker;
    this._type = type;
  }

  get type() {
    return this._type;
  }

  get speaker() {
    return this._speaker;
  }
}

export class DialogLine extends DialogPart {
  #text = null;

  constructor(speaker) {
    super(speaker, "line");
  }

  get text() {
    return this.#text;
  }
}

export class DialogChoice extends DialogPart {
  #uncreatedDialogButtonSeries = null;

  constructor(speaker, dialogButtonSeries) {
    super(speaker, "choice");
    this.#uncreatedDialogButtonSeries = dialogButtonSeries;
  }

  get uncreatedDialogButtonSeries() {
    return this.#uncreatedDialogButtonSeries;
  }
}

export class Dialog {
  #dialogParts = null;
  #idx = 0;
  #speakers = null;
  #nextDialog = null;

  constructor(speakers, ...dialogParts) {
    this.#dialogParts = dialogParts;
    this.#speakers = speakers;
    for (const speaker in this.#speakers) {
      if (speaker.dialogTextObj === null) {
        speaker.dialogTextObj = k.add([
          k.text(""),
          k.scale(0.5),
          k.z(11),
          k.origin("center"),
          k.pos(speaker.pos.add(8, -2)),
        ]);
        speaker.dialogTextObj.hidden = true;
      }
    }
  }

  next() {
    this.#idx++;
    if (this.#idx >= this.#dialogParts) {
      return false;
    } else {
      this.update();
      return true;
    }
  }

  set nextDialog(nextDialog) {
    this.#nextDialog = nextDialog;
  }

  update() {
    if (this.#dialogParts[this.#idx].type === "line") {
      this.#dialogParts[this.#idx].speaker.use(k.text(this.#dialogParts[this.#idx].text));
      for (const speaker in this.#speakers) {
        speaker.dialogTextObj.hidden = speaker === this.#dialogParts[this.#idx].speaker;
      }
      return null;
    } else if (this.#dialogParts[this.#idx].type === "choice") {
      setChoiceListeners(this.#dialogParts[this.#idx].uncreatedDialogButtonSeries.create());
      return this.#nextDialog ?? null;
    } else {
      throw new Error("invalid DialogParts type");
    }
  }
}

export class dialogHandler {
  #initialDialog = null;
  #currentDialog = null;
  #loopDialog = null;

  constructor(initialDialog, loopDialog) {
    this.#initialDialog = initialDialog;
    this.#loopDialog = loopDialog;
    this.#currentDialog = this.#initialDialog;
  }

  start() {
    //
  }
}

export const createDialogText = (npc) => {
  npc.dialogObj = k.add([
    k.text(npc.dialog[npc.currentDialog]),
    k.scale(0.5),
    k.z(11),
    k.origin("center"),
    k.pos(npc.pos.add(8, -2)),
  ]);
};

export const nextDialog = (npc) => {
  npc.currentDialog = (npc.currentDialog + 1) % npc.dialog.length;
  npc.dialogObj.use(k.text(npc.dialog[npc.currentDialog]));
}