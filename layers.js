import { k } from "./kaboom.js";

export const addLayers = () => {
  k.layers([
    "bg",
    "game",
    "ui",
  ], "game");
};
