kaboom({
  global: true,
  fullscreen: true,
  scale: 0.6,
  debug: true
})

scene("menu", () => {

	add([
		text("Snake game"),
		pos(240, 80),
		scale(3),
	]);

	add([
		rect(160, 20),
		pos(240, 180),
		"button",
		{
			clickAction: () => go('game'),
		},
	]);

	add([
		text("Play game"),
		pos(240, 180),
		color(0, 0, 0)
	]);

});