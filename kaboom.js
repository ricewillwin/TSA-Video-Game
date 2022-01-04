import config from "./config.js";

const kaboomOpts = {
  background: [134, 135, 247],
  global: false,
  height: config.gameHeight,
  width: config.gameWidth,
  stretch: true,
  scale: 1,
  debug: true,
  canvas: document.querySelector("#game"),
  font: "sink",
};

export const k = kaboom(kaboomOpts);
