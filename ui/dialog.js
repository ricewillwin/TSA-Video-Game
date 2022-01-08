import { k } from "../kaboom.js"
import { setChoiceListeners } from "../input.js";

/**
 *
 */
export class DialogPart {
  /**
   *
   * @type {Object}
   * @private
   */
  _speaker = null;

  /**
   *
   * @private
   */
  _type;

  /**
   *
   * @param {Object} speaker
   * @param {string} type
   */
  constructor(speaker, type) {
    this._speaker = speaker;
    this._type = type;
  }

  /**
   *
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   *
   * @returns {Object}
   */
  get speaker() {
    return this._speaker;
  }
}

/**
 *
 */
export class DialogLine extends DialogPart {
  /**
   *
   * @type {string}
   */
  #text = "";

  constructor(speaker, text) {
    super(speaker, "line");
    this.#text = text;
  }

  /**
   *
   * @returns {string}
   */
  get text() {
    return this.#text;
  }
}

/**
 *
 */
export class DialogChoice extends DialogPart {
  /**
   *
   * @type {UncreatedDialogButtonSeries}
   */
  #uncreatedDialogButtonSeries = null;

  /**
   *
   * @param {Object} speaker
   * @param {UncreatedDialogButtonSeries} uncreatedDialogButtonSeries
   */
  constructor(speaker, uncreatedDialogButtonSeries) {
    super(speaker, "choice");
    this.#uncreatedDialogButtonSeries = uncreatedDialogButtonSeries;
  }

  /**
   *
   * @returns {UncreatedDialogButtonSeries}
   */
  get uncreatedDialogButtonSeries() {
    return this.#uncreatedDialogButtonSeries;
  }
}

/**
 *
 */
export class Dialog {
  /**
   *
   * @type {DialogPart[]}
   */
  #dialogParts = null;

  /**
   *
   * @type {number}
   */
  #idx = 0;

  /**
   *
   * @type {Object[]}
   */
  #speakers = null;

  /**
   *
   * @type {Dialog}
   */
  #nextDialog = null;

  /**
   *
   * @param {Object[]} speakers
   * @param {Dialog} nextDialog
   * @param {...DialogPart} dialogParts
   */
  constructor(speakers, nextDialog=null, ...dialogParts) {
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
    this.#nextDialog = nextDialog;
  }

  /**
   *
   * @returns {boolean}
   */
  next() {
    this.#idx++;
    if (this.#idx >= this.#dialogParts) {
      this.#idx = 0;
      return false;
    } else {
      this.update();
      return true;
    }
  }

  /**
   *
   * @param {} nextDialog
   */
  set nextDialog(nextDialog) {
    this.#nextDialog = nextDialog;
  }

  /**
   *
   * @returns {Dialog}
   */
  get nextDialog() {
    return this.#nextDialog;
  }

  /**
   *
   * @returns {null|Dialog}
   */
  update() {
    if (this.#dialogParts[this.#idx].type === "line") {
      this.#dialogParts[this.#idx].speaker.dialogTextObj.use(k.text(this.#dialogParts[this.#idx].text));
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

  /**
   *
   */
  hide() {
    for (const speaker in this.#speakers) {
      speaker.dialogTextObj.hidden = true;
    }
  }
}

/**
 *
 */
export class DialogHandler {
  /**
   *
   * @type {Dialog}
   */
  #initialDialog = null;

  /**
   *
   * @type {Dialog}
   */
  #currentDialog = null;

  /**
   *
   * @param {Dialog} initialDialog
   */
  constructor(initialDialog) {
    this.#initialDialog = initialDialog;
    this.#currentDialog = this.#initialDialog;
  }

  start() {
    this.#currentDialog.update();
  }

  next() {
    if (!this.#currentDialog.next()) {
      if (this.#currentDialog.nextDialog === null) {
        this.#currentDialog.hide();
      } else {
        this.#currentDialog = this.#currentDialog.nextDialog;
      }
    }
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
};
