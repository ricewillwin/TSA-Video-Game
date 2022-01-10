import { k } from "./kaboom.js";
import { spriteLoader } from "./spriteLoader.js";
import { createDialogText } from "./ui/dialog.js";
import { setGameListeners } from "./input.js";

export const BASE_SPEED = 45;

export var player = null;

export const playerHandler = {
  anim: (key, walk) => {
    return key[0] + "_" + (walk ? "walk" : "idle");
  },

  setAnim: (anim) => {
    if (player.curAnim() !== anim) {
      player.play(anim);
    }
  },

  updateAnim: (last) => {
    if (player.currentHoriz === null) {
      playerHandler.setAnim(playerHandler.anim(last, player.currentVert !== null));
    } else {
      playerHandler.setAnim(playerHandler.anim(player.currentHoriz, true));
    }
  },
};

export const createPlayer = async (name, pos) => {
  await spriteLoader.loadPlayers();
  if (player !== null) k.destroy(player);
  player = k.add(addPlayerOpts(name, pos));
  createDialogText(player);
  player.onUpdate(() => {
    player.use(k.z(player.pos.y));
  })
};

export const keys = {
  RIGHT: ["right", "d", "k"],
  LEFT: ["left", "a", "h"],
  UP: ["up", "w", "u"],
  DOWN: ["down", "s", "j"],
  INTERACT: ["space", "e", "enter"],

  isKeyDown: (key) => {
    return k.isKeyDown(key[0]) || k.isKeyDown(key[1]);
  },

  areBothDown: (key) => {
    return k.isKeyDown(key[0]) && k.isKeyDown(key[1]);
  },
};

export const addPlayerOpts = (name, pos) => [
  k.sprite(name),
  k.origin("center"),
  k.layer("game"),
  k.pos(pos),
  k.area({ width: 8, height: 5, offset: k.vec2(0, 3) }),
  k.solid(),
  k.z(10),
  "player",
  {
    currentHoriz: null,
    currentVert: null,
    speed: BASE_SPEED,
    bouncerPermission: true,
    hasLighter: true,
    hasNapkin: true,
    documents: null,
    dialogTextObj: null,
  },
];

export const initializePlayer = async (name, gameMap) => {
  await createPlayer(name, gameMap.getWorldPos(gameMap.spawn));
  setGameListeners();
}
