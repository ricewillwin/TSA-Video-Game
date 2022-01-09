import { k } from "../kaboom.js";
import { setChoiceListeners, freeze, thaw } from "../input.js";
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
    freeze();
    if (!loaded) loadLose();
    setTimeout(() => {
      k.go("lose");
    }, 1000);
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
  constructor(speakers, nextDialog, ...dialogParts) {
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
    if (this.#idx >= this.#dialogParts.length) {
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
      this.#dialogParts[this.#idx].speaker.dialogTextObj.use(k.text(this.#dialogParts[this.#idx].text));
      for (const idx in this.#speakers) {
        this.#speakers[idx].dialogTextObj.hidden = this.#speakers[idx] !== this.#dialogParts[this.#idx].speaker;
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
    for (const idx in this.#speakers) {
      this.#speakers[idx].dialogTextObj.hidden = true;
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

  restart() {
    this.#currentDialog.restart();
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

export const createDialogText = (character) => {
  character.dialogTextObj = k.add([
    k.text(""),
    k.scale(0.5),
    k.origin("center"),
    k.layer("dialog"),
    k.z(11),
    k.pos(character.pos.add(8, -2)),
  ]);
  character.dialogTextObj.hidden = true;
};
