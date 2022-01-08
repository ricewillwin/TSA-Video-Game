import { k } from "../kaboom.js";
import { initializePlayer, player, BASE_SPEED } from "../player.js";
import { GameMap } from "./index.js";

export var mapObj = null;

export const mapArray = {
  map: [
    "##############",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwww####wwww#",
    "#wwttttttttww#",
    "#wwttttttttww#",
    "#wwttttttttww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "######()######",
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
  spawn: [ 7, 8.4 ],
};

export const loadLevel3a = () => k.scene("level3Transition", async () => {
  k.add([
    k.text("Level Two"),
    k.origin("center"),
    k.scale(3),
    k.pos(k.width()/2, k.height()/2),
  ]);

  k.wait(3, () => {
    k.go("level3")
  });
});

export const loadLevel3 = () => k.scene("level3", async () => {
  const music = k.play("openworld", {
    volume: 0.025,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player", mapObj);

  

  const billiardguy21 = k.add([
    k.sprite("billiardguy2", {anim: "idle", animSpeed: 0.3}),
    k.pos((4*16), (4.4*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 8, height: 16, offset: k.vec2(3, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Boy I do love dancing",
               "dancing.",
               "Ever heard of dancing",
               "Dancing is the best game ever"]
    },
  ]);
  const billiardguy22 = k.add([
    k.sprite("billiardguy2", {anim: "idle", animSpeed: 0.3}),
    k.pos((4*16), (5*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 8, height: 16, offset: k.vec2(3, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Boy I do love dancing",
               "dancing.",
               "Ever heard of dancing",
               "Dancing is the best game ever"]
    },
  ]);
  const billiardguy23 = k.add([
    k.sprite("billiardguy2", {anim: "idle", animSpeed: 0.3}),
    k.pos((10*16), (5*16)),
    k.solid(),
    k.z(3),
    k.area({ width: 8, height: 16, offset: k.vec2(3, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Boy I do love dancing",
               "dancing.",
               "Ever heard of dancing",
               "Dancing is the best game ever"]
    },
  ]);
  const billiardguy24 = k.add([
    k.sprite("billiardguy2", {anim: "idle", animSpeed: 0.3}),
    k.pos((10*16), (4.4*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 8, height: 16, offset: k.vec2(3, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Boy I do love dancing",
               "dancing",
               "Ever heard of dancing",
               "Dancing is the best game ever"]
    },
  ]);
  
  
  

	

  k.camScale(4);
});
