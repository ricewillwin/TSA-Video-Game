import { k } from "./kaboom.js";
import { keys, player, playerHandler } from "./player.js";
import { createDialogText } from "./ui/dialog.js";

let cancellers = [];
export const maxDistance = 3 * 16;
export var touchingNPC = null;
export var freeze = false;
/**
 * Change event listeners to in-game keys.
 */
export const setGameListeners = () => {
  for (let i = 0; i < cancellers.length; i++) {
    cancellers[i]();
  }
  cancellers = [];
  cancellers.push(player.onUpdate(() => {
    if (!freeze) {
      k.camPos(player.pos);
      if (player.dialogTextObj != null) {
        player.dialogTextObj.pos = player.pos.add(8, -10);
      }
      if (tooFar()) {
        touchingNPC.dialogObj.hide();
      }
      player.isMoving = player.currentHoriz || player.currentVert;
    }
  }));

  cancellers.push(k.onKeyPress(keys.RIGHT, () => {
    if (!freeze) {
      player.currentHoriz = keys.RIGHT;
      playerHandler.updateAnim(keys.RIGHT);
    }
  }));

  cancellers.push(k.onKeyDown(keys.RIGHT, () => {
    if (!freeze) {
      if (player.currentHoriz === keys.RIGHT) {
        if (player.currentVert !== null) {
          player.move(player.speed/Math.sqrt(2)*(keys.areBothDown(keys.RIGHT) ? 0.5 : 1), 0);
        }
        else {
          player.move(player.speed*(keys.areBothDown(keys.RIGHT) ? 0.5 : 1), 0);
        }
      }
    }
  }));

  cancellers.push(k.onKeyRelease(keys.RIGHT, () => {
    if (!freeze) {
      if (keys.isKeyDown(keys.LEFT)) {
        player.currentHoriz = keys.LEFT;
      }
      else {
        player.currentHoriz = null;
      }
      playerHandler.updateAnim(keys.RIGHT);
    }
  }));

  cancellers.push(k.onKeyPress(keys.LEFT, () => {
    if (!freeze) {
      player.currentHoriz = keys.LEFT;
      playerHandler.updateAnim(keys.LEFT);
    }
  }));

  cancellers.push(k.onKeyDown(keys.LEFT, () => {
    if(!freeze) {
      if (player.currentHoriz === keys.LEFT) {
        if (player.currentVert !== null) {
          player.move(-player.speed/Math.sqrt(2)*(keys.areBothDown(keys.LEFT) ? 0.5 : 1), 0);
        }
        else {
          player.move(-player.speed*(keys.areBothDown(keys.LEFT) ? 0.5 : 1), 0);
        }
      }
    }
  }));

  cancellers.push(k.onKeyRelease(keys.LEFT, () => {
    if (!freeze) {
      if (keys.isKeyDown(keys.RIGHT)) {
        player.currentHoriz = keys.RIGHT;
      }
      else {
        player.currentHoriz = null;
      }
      playerHandler.updateAnim(keys.LEFT);
    }
  }));

  cancellers.push(k.onKeyPress(keys.UP, () => {
    if (!freeze) {
      player.currentVert = keys.UP;
      playerHandler.updateAnim(keys.RIGHT);
    }
  }));

  cancellers.push(k.onKeyDown(keys.UP, () => {
    if (!freeze) {
      if (player.currentVert === keys.UP) {
        if (player.currentHoriz !== null) {
          player.move(0, -player.speed/Math.sqrt(2)*(keys.areBothDown(keys.UP) ? 0.5 : 1));
        }
        else {
          player.move(0, -player.speed*(keys.areBothDown(keys.UP) ? 0.5 : 1));
        }
      }
    }
  }));

  cancellers.push(k.onKeyRelease(keys.UP, () => {
    if (!freeze) {
      if (keys.isKeyDown(keys.DOWN)) {
        player.currentVert = keys.DOWN;
      }
      else {
        player.currentVert = null;
      }
      playerHandler.updateAnim(keys.RIGHT);
    }
  }));

  cancellers.push(k.onKeyPress(keys.DOWN, () => {
    if (!freeze) {
      player.currentVert = keys.DOWN;
      playerHandler.updateAnim(keys.RIGHT);
    }
  }));

  cancellers.push(k.onKeyDown(keys.DOWN, () => {
    if (!freeze) {
      if (player.currentVert === keys.DOWN) {
        if (player.currentHoriz !== null) {
          player.move(0, player.speed/Math.sqrt(2)*(keys.areBothDown(keys.DOWN) ? 0.5 : 1));
        }
        else {
          player.move(0, player.speed*(keys.areBothDown(keys.DOWN) ? 0.5 : 1));
        }
      }
    }
  }));

  cancellers.push(k.onKeyRelease(keys.DOWN, () => {
    if (!freeze) {
      if (keys.isKeyDown(keys.UP)) {
        player.currentVert = keys.UP;
      }
      else {
        player.currentVert = null;
      }
      playerHandler.updateAnim(keys.RIGHT);
    }
  }));

  cancellers.push(k.onKeyPress(keys.INTERACT, () => {
    if (!freeze) {
      let npcs = k.get("NPC");
      npcs = npcs.slice(0, npcs.length/2);

      if (touchingNPC !== null) {
        if (!touchingNPC.dialogObj.started) {
          touchingNPC.dialogObj.start();
        }
        else {
          touchingNPC.dialogObj.next();
        }
      }
    }
  }));

  cancellers.push(k.onCollide("player", "NPC", (p, n) => {
    if (!freeze) {
      if ((touchingNPC !== null)) {
        if (touchingNPC !== n) {
          touchingNPC.dialogObj.restart();
        }
      }
      touchingNPC = n;
    }
  }));
};

/**
 * Change event listeners to dialog choice.
 * @param {DialogButtonSeries} buttonSeries ButtonSeries of dialog choice.
 */
export const setChoiceListeners = (buttonSeries) => {
  for (let i = 0; i < cancellers.length; i++) {
    cancellers[i]();
  }
  cancellers = [];

  cancellers.push(k.onKeyPress(keys.INTERACT, () => {
    buttonSeries.push();
    delete buttonSeries.destroy();
    setGameListeners();
  }));

  cancellers.push(k.onKeyPress(keys.LEFT, () => {
    buttonSeries.back();
  }));

  cancellers.push(k.onKeyPress(keys.RIGHT, () => {
    buttonSeries.fwd();
  }));
};

export const tooFar = () => {
  if (touchingNPC === null) return false;
  return touchingNPC.pos.dist(player.pos) > maxDistance;
}