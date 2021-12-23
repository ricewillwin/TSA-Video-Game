export const k = kaboom({
  global: true,
  fullscreen: true, 
  scale: 1,
  debug: true,
})

k.layers([
	"bg",
	"game",
	"ui",
], "game")

export default k