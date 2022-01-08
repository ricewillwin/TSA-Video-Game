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
      "tile",
    ]),
    "(": (ctx) => ([
      k.sprite( "door_left"),
      k.area(),
      k.solid(),
      "tile",
      "nextdoor",
    ]),
    ")": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
      "tile",
      "nextdoor",
    ]),
    "w": (ctx) => ([
      k.sprite("wood_floor"),
      k.layer("floor"),
      k.area(),
      "tile",
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
    volume: 0.1,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player", mapObj);

  const auctioneer = k.add([
    k.sprite("auctioneer", {anim: "idle", animSpeed: 0.5}),
    k.pos(6.5*16,1.5*16),
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

  const chair11p = k.add([
    k.sprite("auction_gal_one"),
    k.pos(2.75*16+1,3*16-2),
    k.solid(),
    k.z(1),
    k.area(),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
      "You're good, go in"]
    },
  ]);

  const chair11= k.add([
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

  const chair14p = k.add([
    k.sprite("auction_guy_two"),
    k.pos(7.25*16+1,3*16-2),
    k.solid(),
    k.z(1),
    k.area(),
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

  const chair15p = k.add([
    k.sprite("auction_gal_two"),
    k.pos(8.75*16+1,3*16-2),
    k.solid(),
    k.z(1),
    k.area(),
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

  const chair21p = k.add([
    k.sprite("auction_guy_one"),
    k.pos(2.75*16+1,4.5*16-2),
    k.solid(),
    k.z(1),
    k.area(),
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

  const chair22p = k.add([
    k.sprite("auction_gal_two"),
    k.pos(4.25*16+1,4.5*16-2),
    k.solid(),
    k.z(1),
    k.area(),
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
    k.pos(4.255*16,4.5*16),
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

  const chair25p = k.add([
    k.sprite("auction_gal_one"),
    k.pos(8.75*16+1,4.5*16-2),
    k.solid(),
    k.z(1),
    k.area(),
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

  const chair26p = k.add([
    k.sprite("auction_gal_two"),
    k.pos(10.25*16+1,4.5*16-2),
    k.solid(),
    k.z(1),
    k.area(),
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

  const chair33p = k.add([
    k.sprite("auction_guy_one"),
    k.pos(5.75*16+1,6*16-2),
    k.solid(),
    k.z(1),
    k.area(),
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

  const chair35p = k.add([
    k.sprite("auction_guy_two"),
    k.pos(8.75*16+1,6*16-2),
    k.solid(),
    k.z(1),
    k.area(),
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
    k.pos(8.755*16,6*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const chair36p = k.add([
    k.sprite("auction_gal_one"),
    k.pos(10.25*16+1,6*16-2),
    k.solid(),
    k.z(1),
    k.area(),
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

  const bouncerRight_1 = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos(1.4*16,2.5*16),
    k.solid(),
    k.z(1),
    k.area(),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);
  const bouncerLeft_1 = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos((3.5*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);
  const bouncerLeft_2 = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos((5*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);
  const bouncerRight_2 = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos((6.6*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);
  const bouncerLeft_3 = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos((8*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);
  const bouncerRight_3 = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos((9.5*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);
  const bouncerRight_4 = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos((11.6*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);

  k.camScale(4);
});
