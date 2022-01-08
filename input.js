import { k } from "./kaboom.js";
import { keys, player, playerHandler } from "./player.js";
import { createDialogText, nextDialog } from "./dialog.js";

let cancellers = [];

/**
 * Change event listeners to in-game keys.
 * @param {Object} touchingNPC NPC currently touching
 */
export const setGameListeners = (touchingNPC) => {
  for (let i = 0; i < cancellers.length; i++) {
    cancellers[i]();
  }
  cancellers = [];
  cancellers.push(player.onUpdate(() => {
    k.camPos(player.pos);
    if (player.dialogTextObj != null) {
      player.dialogTextObj.pos = player.pos.add(8, -2);
    }
    player.isMoving = player.currentHoriz || player.currentVert;
  }));

  cancellers.push(k.onKeyPress(keys.RIGHT, () => {
    player.currentHoriz = keys.RIGHT;
    playerHandler.updateAnim(keys.RIGHT);
  }));

  cancellers.push(k.onKeyDown(keys.RIGHT, () => {
    if (player.currentHoriz === keys.RIGHT) {
      if (player.currentVert !== null) {
        player.move(player.speed / Math.sqrt(2) * (keys.areBothDown(keys.RIGHT) ? 0.5 : 1), 0);
      } else {
        player.move(player.speed * (keys.areBothDown(keys.RIGHT) ? 0.5 : 1), 0);
      }
    }
  }));

  cancellers.push(k.onKeyRelease(keys.RIGHT, () => {
    if (keys.isKeyDown(keys.LEFT)) {
      player.currentHoriz = keys.LEFT;
    } else {
      player.currentHoriz = null;
    }
    playerHandler.updateAnim(keys.RIGHT);
  }));

  cancellers.push(k.onKeyPress(keys.LEFT, () => {
    player.currentHoriz = keys.LEFT;
    playerHandler.updateAnim(keys.LEFT);
  }));

  cancellers.push(k.onKeyDown(keys.LEFT, () => {
    if (player.currentHoriz === keys.LEFT) {
      if (player.currentVert !== null) {
        player.move(-player.speed / Math.sqrt(2) * (keys.areBothDown(keys.LEFT) ? 0.5 : 1), 0);
      } else {
        player.move(-player.speed * (keys.areBothDown(keys.LEFT) ? 0.5 : 1), 0);
      }
    }
  }));

  cancellers.push(k.onKeyRelease(keys.LEFT, () => {
    if (keys.isKeyDown(keys.RIGHT)) {
      player.currentHoriz = keys.RIGHT;
    } else {
      player.currentHoriz = null;
    }
    playerHandler.updateAnim(keys.LEFT);
  }));

  cancellers.push(k.onKeyPress(keys.UP, () => {
    player.currentVert = keys.UP;
    playerHandler.updateAnim(keys.RIGHT);
  }));

  cancellers.push(k.onKeyDown(keys.UP, () => {
    if (player.currentVert === keys.UP) {
      if (player.currentHoriz !== null) {
        player.move(0, -player.speed / Math.sqrt(2) * (keys.areBothDown(keys.UP) ? 0.5 : 1));
      } else {
        player.move(0, -player.speed * (keys.areBothDown(keys.UP) ? 0.5 : 1));
      }
    }
  }));

  cancellers.push(k.onKeyRelease(keys.UP, () => {
    if (keys.isKeyDown(keys.DOWN)) {
      player.currentVert = keys.DOWN;
    } else {
      player.currentVert = null;
    }
    playerHandler.updateAnim(keys.RIGHT);
  }));

  cancellers.push(k.onKeyPress(keys.DOWN, () => {
    player.currentVert = keys.DOWN;
    playerHandler.updateAnim(keys.RIGHT);
  }));

  cancellers.push(k.onKeyDown(keys.DOWN, () => {
    if (player.currentVert === keys.DOWN) {
      if (player.currentHoriz !== null) {
        player.move(0, player.speed / Math.sqrt(2) * (keys.areBothDown(keys.DOWN) ? 0.5 : 1));
      } else {
        player.move(0, player.speed * (keys.areBothDown(keys.DOWN) ? 0.5 : 1));
      }
    }
  }));

  cancellers.push(k.onKeyRelease(keys.DOWN, () => {
    if (keys.isKeyDown(keys.UP)) {
      player.currentVert = keys.UP;
    } else {
      player.currentVert = null;
    }
    playerHandler.updateAnim(keys.RIGHT);
  }));

  cancellers.push(k.onKeyPress(keys.INTERACT, () => {
    let npcs = k.get("NPC");
    npcs = npcs.slice(0, npcs.length / 2);
    
    if (touchingNPC !== null) {
      if (touchingNPC.dialogObj === null) {
        createDialogText(touchingNPC);
      } else {
        nextDialog(touchingNPC);
      }
    }
  }));

  cancellers.push(k.onCollide("player", "NPC", (p, n) => {
    // console.log(n)
    if ((touchingNPC != null) && (touchingNPC.dialogObj != null)) {
      touchingNPC.dialogObj.destroy();
      touchingNPC.dialogObj = null;
    }
    touchingNPC = n;
    if (n.dialogObj === null) {
      createDialogText(n);
    } else {
      nextDialog(n);
    }
  }));
};

/**
 * Change event listeners to dialog choice.
 * @param {ButtonSeries} buttonSeries ButtonSeries of dialog choice.
 */
export const setChoiceListeners = (buttonSeries) => {
  for (let i = 0; i < cancellers.length; i++) {
    cancellers[i]();
  }
  cancellers = [];

  cancellers.push(k.onKeyPress(keys.INTERACT, () => {
    buttonSeries.push();
  }));

  cancellers.push(k.onKeyPress(keys.LEFT, () => {
    buttonSeries.back();
  }));

  cancellers.push(k.onKeyPress(keys.RIGHT, () => {
    buttonSeries.fwd();
  }));
};

