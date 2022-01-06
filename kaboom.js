import config from "./config.js";

const kaboomOpts = {
  background: [20, 20, 20],
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
