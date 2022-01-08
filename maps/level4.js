import { k } from "../kaboom.js";
import { initializePlayer, player, BASE_SPEED } from "../player.js";
import { GameMap } from "./index.js";

export var mapObj = null;

export const mapArray = {
  map: [
    "##############",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
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
      "nextdoor",
    ]),
    ")": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
      "nextdoor",
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

export const loadLevel4a = () => k.scene("level4Transistion", async () => {
  k.add([
    k.text("Level Three"),
    k.scale(3),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
  ]);

  k.wait(3, () => {
    k.go("level4")
  });
});

export const loadLevel4 = () => k.scene("level4", async () => {
  const music = k.play("openworld", {
    volume: 0.05,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player", mapObj);

  const auctioneer = k.add([
    k.sprite("auctioneer", {anim: "idle", animSpeed: 0.5}),
    k.pos(7.5*16,1.5*16),
    k.solid(),
    k.z(1),
    k.area({ width: 8, height: 16, offset: k.vec2(3, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);

  const personOne = k.add([
    k.sprite("guy_five", {anim: "idle", animSpeed: 0.4}),
    k.pos(2.75*16,2.9*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair11 = k.add([
    k.sprite("chair_auction"),
    k.pos(2.75*16,3*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const chair12 = k.add([
    k.sprite("chair_auction"),
    k.pos(4.25*16,3*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const chair13 = k.add([
    k.sprite("chair_auction"),
    k.pos(5.75*16,3*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const personTwo = k.add([
    k.sprite("guy_six", {anim: "idle", animSpeed: 0.4}),
    k.pos(7.25*16,2.9*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair14 = k.add([
    k.sprite("chair_auction"),
    k.pos(7.25*16,3*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const personThree = k.add([
    k.sprite("guy_seven", {anim: "idle", animSpeed: 0.4}),
    k.pos(8.75*16,2.9*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair15 = k.add([
    k.sprite("chair_auction"),
    k.pos(8.75*16,3*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const chair16 = k.add([
    k.sprite("chair_auction"),
    k.pos(10.25*16,3*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);



  const personFour = k.add([
    k.sprite("guy_eight", {anim: "idle", animSpeed: 0.4}),
    k.pos(2.75*16,4.4*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair21 = k.add([
    k.sprite("chair_auction"),
    k.pos(2.75*16,4.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const personFive = k.add([
    k.sprite("guy_two", {anim: "idle", animSpeed: 0.4}),
    k.pos(4.25*16,4.4*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair22 = k.add([
    k.sprite("chair_auction"),
    k.pos(4.25*16,4.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const chair23 = k.add([
    k.sprite("chair_auction"),
    k.pos(5.75*16,4.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const chair24 = k.add([
    k.sprite("chair_auction"),
    k.pos(7.25*16,4.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const personSix = k.add([
    k.sprite("guy_three", {anim: "idle", animSpeed: 0.4}),
    k.pos(8.75*16,4.4*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair25 = k.add([
    k.sprite("chair_auction"),
    k.pos(8.75*16,4.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const personSeven = k.add([
    k.sprite("gal_one", {anim: "idle", animSpeed: 0.4}),
    k.pos(10.25*16,4.4*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair26 = k.add([
    k.sprite("chair_auction"),
    k.pos(10.25*16,4.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);
  

  const chair31 = k.add([
    k.sprite("chair_auction"),
    k.pos(2.75*16,6*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const chair32 = k.add([
    k.sprite("chair_auction"),
    k.pos(4.25*16,6*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const personEight = k.add([
    k.sprite("guy_four", {anim: "idle", animSpeed: 0.4}),
    k.pos(5.75*16,5.9*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair33 = k.add([
    k.sprite("chair_auction"),
    k.pos(5.75*16,6*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const chair34 = k.add([
    k.sprite("chair_auction"),
    k.pos(7.25*16,6*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const personNine = k.add([
    k.sprite("gal_two", {anim: "idle", animSpeed: 0.4}),
    k.pos(8.75*16,5.9*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair35 = k.add([
    k.sprite("chair_auction"),
    k.pos(8.75*16,6*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const personTen = k.add([
    k.sprite("gal_three", {anim: "idle", animSpeed: 0.4}),
    k.pos(10.25*16,5.9*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair36 = k.add([
    k.sprite("chair_auction"),
    k.pos(10.25*16,6*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  k.camScale(4);
});
