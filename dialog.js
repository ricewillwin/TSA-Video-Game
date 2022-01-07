import { k } from "./kaboom.js"

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
  #dialogButtons = null;

  constructor(speaker, ...dialogButtons) {
    super(speaker, "choice");
    this.#dialogButtons = dialogButtons;
  }
}

export class Dialog {
  #dialogParts = null;
  #idx = 0;
  #nextDialog = null;
  #speakers = null;

  constructor(nextDialog, speakers, ...dialogParts) {
    this.#dialogParts = dialogParts;
    this.#nextDialog = nextDialog;
    this.#speakers = speakers;
    for (const speaker in this.#speakers) {
      if (speaker.dialogTextObj == null) {
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

  get nextDialog() {
    return this.#nextDialog;
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

  update() {
    if (this.#dialogParts[this.#idx].type == "line") {
      this.#textObj.use(k.text(this.#dialogParts[this.#idx].text));
      for (const speaker in this.#speakers) {
        speaker.dialogTextObj.hidden = speaker == this.#dialogParts[this.#idx].speaker;
      }
    } else if (this.#dialogParts[this.#idx].type == "choice") {
      //
    } else {
      throw new Error("invalid DialogParts type");
    }
  }
}

export class dialogHandler {
  #initialDialog = null;
  #currentDialog = null;
  #returnDialog = null;

  constructor(initialDialog, returnDialog) {
    this.#initialDialog = initialDialog;
    this.#returnDialog = returnDialog;
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