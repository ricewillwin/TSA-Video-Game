import { k } from "./../kaboom.js";
import { loadLevel1 } from "./level1.js";

export var loaded = false;

export const loadLose = () => k.scene("lose", () => {
  loaded = true;
  k.add([
    k.text("You were found out"),
    k.scale(2),
    k.pos(k.width()/2, k.height()/2),
    k.layer("ui"),
  ]);


  k.wait(3, () => {
    k.go("level1");
  })
})
