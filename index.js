kaboom({
  global: true,
  fullscreen: true,
  scale: 0.6,
  debug: true,
})

scene("menu", () => {

	add([
		text("Snake game"),
		pos(240, 80),
		scale(3),
	]);

	add([
		rect(450, 80),
		pos(300, 350),
		origin("center"),
		"button",
	]);

	add([
		text("Play game"),
		pos(300, 350),
		origin("center"),
		color(0, 0, 0),
	]);

});

go("menu");
