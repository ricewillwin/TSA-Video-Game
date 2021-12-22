import k from "./kaboom";

k.scene("menu", () => {

	k.add([
		k.text("Video game"),
		k.pos(240, 80),
		k.scale(3),
	]);

	k.add([
		k.rect(160, 20),
		k.pos(240, 180),
		"button",
		{
			clickAction: () => go('game'),
		},
	]);

	k.add([
		k.text("Play game"),
		k.pos(240, 180),
		k.color(0, 0, 0),
	]);

});

k.go("menu");