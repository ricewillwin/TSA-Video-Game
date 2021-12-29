import config from "./config.js"

export const k = kaboom({
  background: [134, 135, 247],
  global: true,
  height: config.gameHeight,
  width: config.gameWidth,
  stretch: true,
  scale: 1,
  debug: true,
  canvas: document.querySelector("#game"),
})

k.layers([
	"bg",
	"game",
	"ui",
], "game")

export default k