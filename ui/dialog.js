import { k } from "../kaboom.js";
import { setChoiceListeners } from "../input.js";
import { loaded, loadLose } from "../maps/lose.js";

/**
 *
 */
export class DialogPart {
  /**
   *
   * @type {Object}
   * @protected
   */
  _speaker = null;

  /**
   *
   * @type {string}
   * @protected
   */
  _type = "";

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
   * @returns {null}
   */
  get type() {
    return null;
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

  get type() {
    return "line";
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

export class DialogLose extends DialogPart {
  /**
   *
   * @type {string}
   */
  #text = "";

  constructor(speaker) {
    super(speaker, "lose");
    this.#text = "GUARDS!!!";
  }

  /**
   *
   * @returns {string}
   */
  get text() {
    return this.#text;
  }

  lose() {
    if (!loaded) loadLose();
    k.timer(1, () => {
      k.go("lose");
    });
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
    this.#nextDialog = nextDialog;
  }

  /**
   *
   * @returns {boolean}
   */
  next() {
    this.#idx++;
    if (this.#idx >= this.#dialogParts) {
      return false;
    } else {
      this.update();
      return true;
    }
  }

  /**
   *
   */
  restart() {
    this.#idx = 0;
    this.update();
  }

  /**
   *
   * @param {Dialog} nextDialog
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
   */
  update() {
    if (this.#dialogParts[this.#idx].type === "line") {
      console.log(this.#dialogParts[this.#idx].speaker);
      this.#dialogParts[this.#idx].speaker.dialogTextObj.use(k.text(this.#dialogParts[this.#idx].text));
      for (const speaker in this.#speakers) {
        speaker.dialogTextObj.hidden = speaker === this.#dialogParts[this.#idx].speaker;
      }
    }
    else if (this.#dialogParts[this.#idx].type === "choice") {
      setChoiceListeners(this.#dialogParts[this.#idx].uncreatedDialogButtonSeries.create());
    } else if (this.#dialogParts[this.#idx].type === "lose") {
      this.#dialogParts[this.#idx].speaker.dialogTextObj.use(k.text(this.#dialogParts[this.#idx].text));
      this.#dialogParts[this.#idx].lose();
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
  #started = false;

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
    this.#started = true;
    this.#currentDialog.update();
  }

  next() {
    if (!this.#currentDialog.next()) {
      if (this.#currentDialog.nextDialog !== null) {
        this.#currentDialog = this.#currentDialog.nextDialog;
        this.#currentDialog.restart();
      }
    }
  }

  get started() {
    return this.#started;
  }

  hide() {
    this.#currentDialog.hide();
  }
}

export const createDialogText = (npc) => {
  npc.dialogTextObj = k.add([
    k.text(""),
    k.scale(0.5),
    k.layer("ui"),
    k.origin("center"),
    k.pos(npc.pos.add(8, -2)),
  ]);
  npc.dialogTextObj.hidden = true;
};

export const nextDialog = (npc) => {
  npc.currentDialog = (npc.currentDialog + 1) % npc.dialog.length;
  npc.dialogObj.use(k.text(npc.dialog[npc.currentDialog]));
};
