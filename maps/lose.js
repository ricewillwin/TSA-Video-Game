import { k } from "./../kaboom.js";

export var loaded = false;

export const loadLose = () => k.scene("lose", () => {
  loaded = true;
  k.add([
    k.text("You were found out"),
    k.scale(2),
    k.pos(k.width()/2, k.height()/2),
    k.layer("ui"),
  ]);
})
