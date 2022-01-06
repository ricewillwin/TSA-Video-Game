import { k } from "../kaboom.js";
import { initializePlayer } from "../player.js";
import { GameMap } from "./index.js";

export var mapObj = null;

export const mapArray = {
  map: [
    "##########################################",
    "##########################################",
    "##########################################",
    "###########wwwwwwwwwwwwwwwwwwww###########",
    "###########wwwwwwwwwwwwwwwwwwww###########",
    "###########wwwwwwwwwwwwwwwwwwww###########",
    "###########wwwwwwwwwwwwwwwwwwww###########",
    "###########wwwwwwwwwwwwwwwwwwww###########",
    "###########wwtttwwwwwwwwwwtttww###########",
    "###########wwtttwwwwwwwwwwtttww###########",
    "###########wwwwwwwwwwwwwwwwwwww###########",
    "###########wwwwwwwwwwwwwwwwwwww###########",
    "###########wwwwwwwwwwwwwwwwwwww###########",
    "####################()####################",
    "##########################################",
    "##########################################",
  ],
  objs: [
    {
      pos: [[8, 1], [11, 1]], comps: [
        k.area(),
        k.solid(),
      ],
    },
    {
      pos: [[27, 10]], comps: [
        k.sprite("car_red", { frame: 0 }),
        k.area(),
        k.solid(),
      ],
    },
    {
      pos: [[29, 10]], comps: [
        k.sprite("car_red", { frame: 1 }),
        k.area(),
        k.solid(),
      ],
    },
  ],
  legend: {
    width: 16,
    height: 16,
    "#": (ctx) => ([
      k.sprite("wall_stone"),
      k.area(),
      k.solid(),
    ]),
    "(": (ctx) => ([
      k.sprite( "door_left"),
      k.area(),
      k.solid(),
    ]),
    ")": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
    ]),
    "_": (ctx) => ([
      k.sprite("sidewalk"),
      k.layer("floor"),
      k.area(),
    ]),
    "B": (ctx) => ([
      k.sprite("bouncer"),
      k.area(),
      k.solid(),
    ]),
    "*": (ctx) => ([
      k.sprite("pavement"),
      k.layer("floor"),
      k.area(),
    ]),
    "!": (ctx) => ([
      k.sprite("pavement_vert"),
      k.layer("floor"),
      k.area(),
    ]),
    "~": (ctx) => ([
      k.sprite("pavement_horiz"),
      k.layer("floor"),
      k.area(),
    ]),
    "j": (ctx) => ([
      k.sprite("pavement_junction_up"),
      k.layer("floor"),
      k.area(),
    ]),
    "w": (ctx) => ([
      k.sprite("wood_floor"),
      k.layer("floor"),
      k.area(),
    ]),
    "t": (ctx) => ([
      k.sprite("table"),
      k.layer("floor"),
      k.area(),
    ]),
  },
  spawn: [ 21, 12 ],
};

export const loadLevel2 = () => k.scene("level2", async () => {
  const music = k.play("openworld", {
    volume: 0.1,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player_bad", mapObj);
  const table_left = k.add([
    k.sprite("table"),
    k.pos(208,144),
    k.solid(),
    k.z(2),
    k.area({ width: 48, height: 32 }),
  ]);
  k.camScale(1);
});
