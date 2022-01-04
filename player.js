import { k } from "./kaboom.js";
import { mapObj, layout } from "./Levels/level1.js";

const keys = {
	UP: ["up", "w"],
	DOWN: ["down", "s"],
	LEFT: ["left", "a"],
	RIGHT: ["right", "d"],
};

const SPEED = 3;

export const player = null;

export const addPlayer = () => {
	player = k.add([
		k.player("player_bad"),
		k.pos(mapObj.getPos(...mapObj.playerPos)),
		k.area(),
		k.solid(),
	]);

	player.onUpdate(() => {
		k.camPos(player.pos);
	});

	k.onKeyDown(keys.UP, () => {
		player.move(-SPEED)
	})
}
