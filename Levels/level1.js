import { k } from "../kaboom.js";

export const loadLevel1 = () => k.scene("level1", () => {
  k.add([
    k.text("level1"),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
  ]);
});
