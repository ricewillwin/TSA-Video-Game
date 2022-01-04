import { k } from "../kaboom.js";

export const layout = {
  map: [
    "####################",
    "#########()#########",
    "____________________",
    "********************",
    "~~j~~j~~j~~j~~j~~j~~",
  ],
  objs: {
    "bouncer": [[8, 1], [11, 1]],
    "car_red": [[0, 4]],
  },
  keys: {
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
      k.area(),
    ]),
    "B": (ctx) => ([
      k.sprite("bouncer"),
      k.area(),
      k.solid(),
    ]),
    "*": (ctx) => ([
      k.sprite("pavement"),
      k.area(),
    ]),
    "!": (ctx) => ([
      k.sprite("pavement_vert"),
      k.area(),
    ]),
    "~": (ctx) => ([
      k.sprite("pavement_horiz"),
      k.area(),
    ]),
    "j": (ctx) => ([
      k.sprite("pavement_junction_up"),
      k.area(),
      k.solid(),
    ])
  },
  playerPos: [ 9, 3 ],
};

export const loadLevel1 = () => k.scene("level1", () => {
  // k.add([
  //   k.text("level1"),
  //   k.origin("center"),
  //   k.pos(k.width()/2, k.height()/2),
  // ]);

  k.addLevel(layout.map, {
    "width": 16,
    "height": 16,
    "pos": k.pos(...layout.playerPos),
    ...layout.keys,
  });
});
