import { k } from "../kaboom.js";
import { initializePlayer, player, BASE_SPEED } from "../player.js";
import { GameMap } from "./index.js";
import { loadLevel3, loadLevel3a } from "./level3.js"
import { createDialogText } from "../ui/dialog.js";

export var mapObj = null;

export const mapArray = {
  map: [
    "######()######",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "#wwwwwwwwwwww#",
    "######{}######",
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
      "exitdoor",
    ]),
    "}": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
      "exitdoor",
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

export const Objs = {};

export const loadLevel2a = () => k.scene("level2Transition", async () => {
  k.add([
    k.text("Level One"),
    k.scale(3),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
  ]);

  k.wait(3, () => {
    k.go("level2")
  });
});

export const loadLevel2 = () => k.scene("level2", async () => {
  const music = k.play("openworld", {
    volume: 0.1,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player", mapObj);

  Objs.table_left = k.add([
    k.sprite("table"),
    k.pos((7*16), (5*16)),
    k.origin("center"),
    k.solid(),
    k.z(1),
    k.area({ width: 48, height: 34, offset: k.vec2(0, -2)}),
  ]);

  Objs.bouncerRight = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos((5*16), (0.4*16)),
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
  createDialogText(Objs.bouncerRight);

  Objs.billiardguy1 = k.add([
    k.sprite("billiardguy1", {anim: "idle", animSpeed: 0.2}),
    k.pos((4.5*16), (3.8*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 10, height: 14, offset: k.vec2(3, 2) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.billiardguy1);

  Objs.billiardguy2 = k.add([
    k.sprite("billiardguy2", {anim: "idle", animSpeed: 0.3}),
    k.pos((8.5*16), (4.2*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 8, height: 16, offset: k.vec2(3, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.billiardguy2);

  Objs.billiardguy3 = k.add([
    k.sprite("billiardguy3", {anim: "idle", animSpeed: 0.3}),
    k.pos((12*16), (1.8*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 7, height: 15, offset: k.vec2(4, 1) }),
    // "NPC",
    "lighter_dude",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.billiardguy3);

  Objs.personOne = k.add([
    k.sprite("guy_eight", {anim: "idle", animSpeed: 0.3}),
    k.pos(2.5*16,3*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.personOne);

  Objs.personTwo = k.add([
    k.sprite("guy_three", {anim: "idle", animSpeed: 0.4}),
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
  createDialogText(Objs.personTwo);

  Objs.personSeven = k.add([
    k.sprite("gal_one", {anim: "idle", animSpeed: 0.2}),
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
  createDialogText(Objs.personSeven);

  Objs.personSix = k.add([
    k.sprite("gal_two", {anim: "idle", animSpeed: 0.5}),
    k.pos(9.7*16,6.6*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
     "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.personSix);

  Objs.personThree = k.add([
    k.sprite("gal_three", {anim: "idle", animSpeed: 0.4}),
    k.pos(9.5*16,7.2*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.personThree);

  Objs.personFour = k.add([
    k.sprite("guy_two", {anim: "idle", animSpeed: 0.6}),
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
  createDialogText(Objs.personFour);

  Objs.personFive = k.add([
    k.sprite("guy_four", {anim: "idle", animSpeed: 0.2}),
    k.pos(10.3*16,7.1*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.personFive);

  

  k.onCollide("player", "lighter_dude", () => {
    player.hasLighter = true; // TODO
  });

  k.onCollide("player", "nextdoor", () => {
    if(player.hasLighter) {
      music.stop()
      loadLevel3();
      loadLevel3a();
      k.go("level3Transition");
    }
  });

  k.camScale(4);
  loadLevel2Dialogs();
});

export const loadLevel2Dialogs = () => {
  let tempDialog;
  let tempUncreatedButtonSeries;
  Objs.personSix.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.personSix],
    null,
    new DialogLine(player, "Hello."),
    new DialogLine(Objs.personSix, "Welcome to the Billiards Room!"),
    
  )));
  tempUncreatedButtonSeries.dialog = tempDialog;
};