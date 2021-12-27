export const k = kaboom({
  background: [134, 135, 247],
  global: true,
  height: 480,
  width: 640,
  scale: 2,
  debug: true,
  canvas: document.querySelector("#game"),
})

k.layers([
	"bg",
	"game",
	"ui",
], "game")

export default k