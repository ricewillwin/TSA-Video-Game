import { k } from "../kaboom.js";

export const layout = {
  map: [
    "#########()#########",
    "________B__B________",
    "********************",
    "********************",
    "**!**!**!**!**!**!**",
    "**!**!**!**!**!**!**",
    "**!**!**!**!**!**!**",
    "~~j~~j~~j~~j~~j~~j~~",
  ],
  addIns: {
    "car": [0, 4],
  },
  keys: {
    "#": "outer wall",
    "(": "left door",
    ")": "right door",
    "_": "sidewalk",
    "B": "bouncer",
    "*": "pavement",
    "!": "pavement with vertical line",
    "~": "pavement with horizontal line",
    "j": "pavement with junction up",
  },
};

export const loadLevel1 = () => k.scene("level1", () => {
  k.add([
    k.text("level1"),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
  ]);
});
