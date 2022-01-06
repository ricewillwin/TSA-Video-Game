import { k } from "../kaboom.js";
import { initializePlayer, player } from "../player.js";
import { GameMap } from "./index.js";
import { loadLevel2 } from "./level2.js";

export var mapObj = null;

export const mapArray = {
  map: [
    "##################################",
    "##################################",
    "################()################",
    "__________________________________",
    "__________________________________",
    "**********************************",
    "**********************************",
    "~~*~~~~~*~~~~~*~~~~~*~~~~~*~~~~~*~",
    "**********************************",
    "**********************************",
    "__________________________________",
    "##################################",
    "##################################",
    "##################################",
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
      "door",
    ]),
    ")": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
      "door",
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
    ])
  },
  spawn: [ 17, 5 ],

};

export const loadLevel1 = () => k.scene("level1", async () => {
  const music = k.play("openworld", {
    volume: 0.1,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player", mapObj);

  const bouncerLeft = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos(286,38),
    k.solid(),
    k.z(1),
    k.area({ width: 9, height: 16, offset: k.vec2(3, 0) }),
  ]);

  const bouncerRight = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos(242,38),
    k.solid(),
    k.z(1),
    k.area({ width: 9, height: 16, offset: k.vec2(4, 0) }),
  ]);


  k.onCollide("player", "door", () => {
    loadLevel2();
    k.go("level2");
    music.stop()
  })

  k.camScale(4);






  const redCar = k.add([
    k.sprite("car_red"),
    k.pos((17*16),(6*16)),
    k.solid(),
    k.z(1),
    k.area({width: 32, height: 16}),
    k.rotate(90),
    k.origin("center")
  ]);
  const yellowCar = k.add([
    k.sprite("car_yellow"),
    k.pos((23*16),(9.3*16)),
    k.solid(),
    k.z(1),
    k.area({width: 32, height: 16}),
    k.rotate(270),
    k.origin("center")
  ]);
  const greenCar = k.add([
    k.sprite("car_green"),
    k.pos((7*16),(6.5*16)),
    k.solid(),
    k.z(1),
    k.area({width: 32, height: 16}),
    k.rotate(90),
    k.origin("center")
  ]);

  const blockade1 = k.add([
    k.sprite("car_red"),
    k.pos((4.4*16),(4*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center")
  ]);
  const blockade2 = k.add([
    k.sprite("car_blue"),
    k.pos((4.5*16),(6*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center")
  ]);
  const blockade3 = k.add([
    k.sprite("car_green"),
    k.pos((4.75*16),(8*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center")
  ]);
  const blockade4 = k.add([
    k.sprite("car_striped"),
    k.pos((4.6*16),(10*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
    k.rotate(180)
  ]);



  const blockade5 = k.add([
    k.sprite("car_striped"),
    k.pos((29.6*16),(4*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center")
  ]);
  const blockade6 = k.add([
    k.sprite("car_blue"),
    k.pos((29.2*16),(6*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
    k.rotate(180)
  ]);
  const blockade7 = k.add([
    k.sprite("car_green"),
    k.pos((29.4*16),(8*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
    k.rotate(180)
  ]);
  const blockade8 = k.add([
    k.sprite("car_yellow"),
    k.pos((29.5*16),(10*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
  ]);

  
});
