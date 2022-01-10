import { k } from "../kaboom.js";
import { initializePlayer, player, BASE_SPEED } from "../player.js";
import { loadLevel4, loadLevel4a } from "./level4.js"
import { GameMap } from "./index.js";
import { createDialogText } from "../ui/dialog.js";

export var mapObj = null;

export const mapArray = {
  map: [
    "#########()#########",
    "#wwwwwwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwwwwwww#",
    "#wwwwwwwwwwwwwwwwww#",
    "#########{}#########",
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
      "nextdoor",
    ]),
    ")": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
      "nextdoor",
    ]),
    "{": (ctx) => ([
      k.sprite( "door_left"),
      k.area(),
      k.solid(),
    ]),
    "}": (ctx) => ([
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
  spawn: [ 10, 8.4 ],
};

export const Objs = {};

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
    volume: 0.1,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player", mapObj);
  

  Objs.bouncerLeft = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos((11*16), (0.4*16)),
    k.solid(),
    k.z(1),
    k.area({ width: 9, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    "bouncer",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerLeft);

  Objs.napkinguy = k.add([
    k.sprite("greenshirt_tanpants", {anim: "idle", animSpeed: 0.3}),
    k.pos(2.5*16,3*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "napkin_dude",
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.napkinguy);

  Objs.brownshirt_greypants = k.add([
    k.sprite("brownshirt_greypants", {anim: "idle", animSpeed: 0.4}),
    k.pos(1.5*16,5.2*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.brownshirt_greypants);
  
  Objs.brownshirt_tanpants = k.add([
    k.sprite("brownshirt_tanpants", {anim: "idle", animSpeed: 0.6}),
    k.pos(2*16,2.9*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.brownshirt_tanpants);

  Objs.tableOne = k.add([
    k.sprite("dancetable"),
    k.pos(2.3*16,3.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  
  Objs.redhair_purpledress = k.add([
    k.sprite("redhair_purpledress", {anim: "idle", animSpeed: 0.5}),
    k.pos(5.7*16,6.6*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.redhair_purpledress);
  
  Objs.brownhair_bluedress_left = k.add([
    k.sprite("brownhair_bluedress", {anim: "idle", animSpeed: 0.4}),
    k.pos(5.5*16,7.2*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.brownhair_bluedress_left);
  
  Objs.greenshirt_blackpants = k.add([
    k.sprite("greenshirt_blackpants", {anim: "idle", animSpeed: 0.2}),
    k.pos(6.3*16,7.1*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.greenshirt_blackpants);
  
  Objs.whitehair_reddress_left = k.add([
    k.sprite("whitehair_reddress", {anim: "idle", animSpeed: 0.2}),
    k.pos(2.1*16,5.3*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.whitehair_reddress_left);

  Objs.tableTwo = k.add([
    k.sprite("dancetable"),
    k.pos(1.7*16,5.7*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);



  Objs.greenshirt_tanpants = k.add([
    k.sprite("greenshirt_tanpants", {anim: "idle", animSpeed: 0.3}),
    k.pos(14.5*16,4*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.greenshirt_tanpants);

  Objs.redhair_tanpants = k.add([
    k.sprite("redhair_tanpants", {anim: "idle", animSpeed: 0.6}),
    k.pos(13.8*16,4.1*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.redhair_tanpants);

  Objs.tableFour = k.add([
    k.sprite("dancetable"),
    k.pos(14.3*16,4.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);
  
  Objs.tanshirt_blackpants = k.add([
    k.sprite("tanshirt_blackpants", {anim: "idle", animSpeed: 0.4}),
    k.pos(15.5*16,1.2*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.tanshirt_blackpants);
  
  Objs.whitehair_reddress_right = k.add([
    k.sprite("whitehair_reddress", {anim: "idle", animSpeed: 0.2}),
    k.pos(16.1*16,1.3*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.whitehair_reddress_right);

  Objs.tableThree = k.add([
    k.sprite("dancetable"),
    k.pos(15.7*16,1.7*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  Objs.blondehair_whitedress = k.add([
    k.sprite("blondehair_whitedress", {anim: "idle", animSpeed: 0.5}),
    k.pos(15.8*16,5.6*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.blondehair_whitedress);

  Objs.brownhair_bluedress_right = k.add([
    k.sprite("brownhair_bluedress", {anim: "idle", animSpeed: 0.4}),
    k.pos(15.5*16,6.1*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.brownhair_bluedress_right);

  Objs.redshirt_blackpants = k.add([
    k.sprite("redshirt_blackpants", {anim: "idle", animSpeed: 0.2}),
    k.pos(16.2*16,6.2*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.redshirt_blackpants);

  Objs.dancers_purplegreen_left = k.add([
    k.sprite("dancers_purplegreen", {anim: "idle", animSpeed: 0.4}),
    k.pos(6*16,3*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.dancers_purplegreen_left);

  Objs.dancers_purplegreen_right = k.add([
    k.sprite("dancers_purplegreen", {anim: "idle", animSpeed: 0.6}),
    k.pos(11*16,2*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.dancers_purplegreen_right);

  

  Objs.dancers_whitered = k.add([
    k.sprite("dancers_whitered", {anim: "idle", animSpeed: 0.2}),
    k.pos(12*16,6*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.dancers_whitered);

  Objs.musicianOne = k.add([
    k.sprite("musician", {anim: "idle", animSpeed: 0.2}),
    k.pos(5*16,1.2*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.musicianOne);

  Objs.musicianTwo = k.add([
    k.sprite("musician", {anim: "idle", animSpeed: 0.2}),
    k.pos(6.2*16, 1.3*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.musicianTwo);

  Objs.musicianThree = k.add([
    k.sprite("musician", {anim: "idle", animSpeed: 0.2}),
    k.pos(7.4*16, 1.1*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.musicianThree);

  k.onCollide("player", "napkin_dude", () => {
    player.hasNapkin = true;
  });

  k.onCollide("player", "nextdoor", () => {
    if(player.hasNapkin) {
      music.stop();
      loadLevel4();
      loadLevel4a();
      k.go("level4Transition");
    }
  });

  k.camScale(4);
});
