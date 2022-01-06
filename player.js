import { k } from "./kaboom.js";
import { spriteLoader } from "./spriteLoader.js";

export const BASE_SPEED = 60;

export var player = null;

export const playerHandler = {
	anim: (key, walk) => {
		return key[0] + "_" + (walk ? "walk" : "idle");
	},

	setAnim: (anim) => {
		if (player.curAnim() !== anim) {
			player.play(anim);
		}
	},

	updateAnim: (last) => {
		if (player.currentHoriz === null) {
			playerHandler.setAnim(playerHandler.anim(last, player.currentVert !== null));
		} else {
			playerHandler.setAnim(playerHandler.anim(player.currentHoriz, true));
		}
	},
};

export const createPlayer = async (name, pos) => {
	await spriteLoader.loadPlayers();
	if (player !== null) k.destroy(player);
	player = k.add(addPlayerOpts(name, pos));
};

const keys = {
	RIGHT: ["right", "d"],
	LEFT: ["left", "a"],
	UP: ["up", "w"],
	DOWN: ["down", "s"],

	isKeyDown: (key) => {
		return k.isKeyDown(key[0]) || k.isKeyDown(key[1]);
	},

	areBothDown: (key) => {
		return k.isKeyDown(key[0]) && k.isKeyDown(key[1]);
	},
};

export const addPlayerOpts = (name, pos) => [
	k.sprite(name),
	k.origin("center"),
	k.layer("game"),
	k.pos(pos),
	k.area({width: 7, height: 6, offset: k.vec2(0, 6)}),
	k.solid(),
	k.z(10),
	"player",
	{
		currentHoriz: null,
		currentVert: null,
		speed: BASE_SPEED,
	},
];

export const setListeners = () => {
	player.onUpdate(() => {
		k.camPos(player.pos);
		player.isMoving = player.currentHoriz || player.currentVert;
	});

	k.onKeyPress(keys.RIGHT, () => {
		player.currentHoriz = keys.RIGHT;
		playerHandler.updateAnim(keys.RIGHT);
	});

	k.onKeyDown(keys.RIGHT, () => {
		if (player.currentHoriz === keys.RIGHT) {
			if (player.currentVert !== null) {
				player.move(player.speed / Math.sqrt(2) * (keys.areBothDown(keys.RIGHT) ? 0.5 : 1), 0);
			} else {
				player.move(player.speed * (keys.areBothDown(keys.RIGHT) ? 0.5 : 1), 0);
			}
		}
	});

	k.onKeyRelease(keys.RIGHT, () => {
		if (keys.isKeyDown(keys.LEFT)) {
			player.currentHoriz = keys.LEFT;
		} else {
			player.currentHoriz = null;
		}
		playerHandler.updateAnim(keys.RIGHT);
	});

	k.onKeyPress(keys.LEFT, () => {
		player.currentHoriz = keys.LEFT;
		playerHandler.updateAnim(keys.LEFT);
	});

	k.onKeyDown(keys.LEFT, () => {
		if (player.currentHoriz === keys.LEFT) {
			if (player.currentVert !== null) {
				player.move(-player.speed / Math.sqrt(2) * (keys.areBothDown(keys.LEFT) ? 0.5 : 1), 0);
			} else {
				player.move(-player.speed * (keys.areBothDown(keys.LEFT) ? 0.5 : 1), 0);
			}
		}
	});

	k.onKeyRelease(keys.LEFT, () => {
		if (keys.isKeyDown(keys.RIGHT)) {
			player.currentHoriz = keys.RIGHT;
		} else {
			player.currentHoriz = null;
		}
		playerHandler.updateAnim(keys.LEFT);
	});

	k.onKeyPress(keys.UP, () => {
		player.currentVert = keys.UP;
		playerHandler.updateAnim(keys.RIGHT);
	});

	k.onKeyDown(keys.UP, () => {
		if (player.currentVert === keys.UP) {
			if (player.currentHoriz !== null) {
				player.move(0, -player.speed / Math.sqrt(2) * (keys.areBothDown(keys.UP) ? 0.5 : 1));
			} else {
				player.move(0, -player.speed * (keys.areBothDown(keys.UP) ? 0.5 : 1));
			}
		}
	});

	k.onKeyRelease(keys.UP, () => {
		if (keys.isKeyDown(keys.DOWN)) {
			player.currentVert = keys.DOWN;
		} else {
			player.currentVert = null;
		}
		playerHandler.updateAnim(keys.RIGHT);
	});

	k.onKeyPress(keys.DOWN, () => {
		player.currentVert = keys.DOWN;
		playerHandler.updateAnim(keys.RIGHT);
	});

	k.onKeyDown(keys.DOWN, () => {
		if (player.currentVert === keys.DOWN) {
			if (player.currentHoriz !== null) {
				player.move(0, player.speed / Math.sqrt(2) * (keys.areBothDown(keys.DOWN) ? 0.5 : 1));
			} else {
				player.move(0, player.speed * (keys.areBothDown(keys.DOWN) ? 0.5 : 1));
			}
		}
	});

	k.onKeyRelease(keys.DOWN, () => {
		if (keys.isKeyDown(keys.UP)) {
			player.currentVert = keys.UP;
		} else {
			player.currentVert = null;
		}
		playerHandler.updateAnim(keys.RIGHT);
	});
}

export const initializePlayer = async (name, gameMap) => {
	await createPlayer(name, gameMap.getWorldPos(gameMap.spawn));
	setListeners();
}
