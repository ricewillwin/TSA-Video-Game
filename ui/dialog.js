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
   * @type {Function}
   * @protected
   */
  _call;

  /**
   *
   * @param {Object} speaker
   * @param {string} type
   * @param {Function=} call
   */
  constructor(speaker, type, call) {
    this._speaker = speaker;
    this._type = type;
    this._call = call ?? (() => {});
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

  runCall() {
    this._call();
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

  /**
   *
   * @param {Object} speaker
   * @param {string} text
   * @param {Function=} call
   */
  constructor(speaker, text, call) {
    super(speaker, "line", call);
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
   * @param {Function=} call
   */
  constructor(speaker, uncreatedDialogButtonSeries, call) {
    super(speaker, "choice", call);
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

  /**
   *
   * @param {Object} speaker
   * @param {Function=} call
   */
  constructor(speaker, call) {
    super(speaker, "lose", call);
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
  reset() {
    this.#idx = 0;
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
      let dialogButtonSeries = this.#dialogParts[this.#idx].uncreatedDialogButtonSeries.create();
      k.wait(0.1, () => setChoiceListeners(dialogButtonSeries))
    } else if (this.#dialogParts[this.#idx].type === "lose") {
      this.#dialogParts[this.#idx].speaker.dialogTextObj.use(k.text(this.#dialogParts[this.#idx].text));
      this.#dialogParts[this.#idx].lose();
    } else {
      throw new Error("invalid DialogParts type");
    }
    this.#dialogParts[this.#idx].runCall();
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
    this.#started = false;
    this.#currentDialog.reset();
  }

  next() {
    if (!this.#currentDialog.next()) {
      if (this.#currentDialog.nextDialog !== null) {
        this.#currentDialog = this.#currentDialog.nextDialog;
        this.#currentDialog.reset();
        this.#currentDialog.update();
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
    k.z(10000),
    k.pos(character.pos.add(8, -10)),
  ]);
  character.dialogTextObj.hidden = true;
};
