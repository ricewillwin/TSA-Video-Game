import { k } from "../kaboom.js";
import { initializePlayer, player, BASE_SPEED } from "../player.js";
import { GameMap } from "./index.js";
import { createDialogText } from "../ui/dialog.js";

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
      "obj",
      "tile",
    ]),
    "(": (ctx) => ([
      k.sprite( "door_left"),
      k.area(),
      k.solid(),
      "obj",
      "tile",
      "nextdoor",
    ]),
    ")": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
      "obj",
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

export const Objs = {};

export const loadLevel4a = () => k.scene("level4Transition", async () => {
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

  Objs.auctioneer = k.add([
    k.sprite("auctioneer", {anim: "idle", animSpeed: 0.2}),
    k.pos(6.5*16,1.5*16),
    k.solid(),
    k.z(1),
    k.area({ width: 8, height: 16, offset: k.vec2(3, 0) }),
    // "NPC",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.auctioneer);

  Objs.chair11p = k.add([
    k.sprite("auction_brownhair"),
    k.pos(2.75*16+1,3*16-2),
    "obj",
  ]);

  Objs.chair11= k.add([
    k.sprite("chair_auction"),
    k.pos(3.25*16,3.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
  ]);

  Objs.chair12 = k.add([
    k.sprite("chair_auction"),
    k.pos(4.75*16,3.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair13 = k.add([
    k.sprite("chair_auction"),
    k.pos(6.25*16,3.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair14p = k.add([
    k.sprite("auction_redhair"),
    k.pos(7.25*16+1,3*16-2),
    "obj",
  ]);

  Objs.chair14 = k.add([
    k.sprite("chair_auction"),
    k.pos(7.75*16,3.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair15p = k.add([
    k.sprite("auction_blondehair"),
    k.pos(8.75*16+1,3*16-2),
    "obj",
  ]);

  Objs.chair15 = k.add([
    k.sprite("chair_auction"),
    k.pos(9.25*16,3.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);
  
  Objs.chair16 = k.add([
    k.sprite("chair_auction"),
    k.pos(10.75*16,3.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair21p = k.add([
    k.sprite("auction_blackhair"),
    k.pos(2.75*16+1,4.5*16-2),
    "obj",
  ]);

  Objs.chair21 = k.add([
    k.sprite("chair_auction"),
    k.pos(3.25*16,5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair22p = k.add([
    k.sprite("auction_blondehair"),
    k.pos(4.25*16+1,4.5*16-2),
    "obj",
  ]);

  Objs.chair22 = k.add([
    k.sprite("chair_auction"),
    k.pos(4.755*16,5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair23 = k.add([
    k.sprite("chair_auction"),
    k.pos(6.25*16,5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair24 = k.add([
    k.sprite("chair_auction"),
    k.pos(7.75*16,5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair25p = k.add([
    k.sprite("auction_brownhair"),
    k.pos(8.75*16+1,4.5*16-2),
    "obj",
  ]);

  Objs.chair25 = k.add([
    k.sprite("chair_auction"),
    k.pos(9.25*16,5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair26p = k.add([
    k.sprite("auction_blondehair"),
    k.pos(10.25*16+1,4.5*16-2),
    "obj",
  ]);

  Objs.chair26 = k.add([
    k.sprite("chair_auction"),
    k.pos(10.75*16,5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);
  
  Objs.chair31 = k.add([
    k.sprite("chair_auction"),
    k.pos(3.25*16,6.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair32 = k.add([
    k.sprite("chair_auction"),
    k.pos(4.75*16,6.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair33p = k.add([
    k.sprite("auction_blackhair"),
    k.pos(5.75*16+1,6*16-2),
    "obj",
  ]);

  Objs.chair33 = k.add([
    k.sprite("chair_auction"),
    k.pos(6.25*16,6.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair34 = k.add([
    k.sprite("chair_auction"),
    k.pos(7.75*16,6.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair35p = k.add([
    k.sprite("auction_redhair"),
    k.pos(8.75*16+1,6*16-2),
    "obj",
  ]);

  Objs.chair35 = k.add([
    k.sprite("chair_auction"),
    k.pos(9.255*16,6.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.chair36p = k.add([
    k.sprite("auction_brownhair"),
    k.pos(10.25*16+1,6*16-2),
    "obj",
  ]);

  Objs.chair36 = k.add([
    k.sprite("chair_auction"),
    k.pos(10.75*16,6.5*16),
    k.origin("center"),
    k.solid(),
    k.area({ width: 7, height: 12, offset: k.vec2(0.5, 1) }),
    "obj",
  ]);

  Objs.bouncerRight_1 = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos(1.4*16,2.5*16),
    k.solid(),
    k.z(1),
    k.area(),
    // "NPC",
    "bouncer",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerRight_1);

  Objs.bouncerLeft_1 = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos((3.5*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    // "NPC",
    "bouncer",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerLeft_1);

  Objs.bouncerLeft_2 = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos((5*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    // "NPC",
    "bouncer",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerLeft_2);

  Objs.bouncerRight_2 = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos((6.6*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    // "NPC",
    "bouncer",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerRight_2);

  Objs.bouncerLeft_3 = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos((8*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    // "NPC",
    "bouncer",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerLeft_3);

  Objs.bouncerRight_3 = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos((9.5*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    // "NPC",
    "bouncer",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerRight_3);

  Objs.bouncerRight_4 = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos((11.6*16), (2.5*16)),
    k.solid(),
    k.z(1),
    k.area(),
    // "NPC",
    "bouncer",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerRight_4);

  k.camScale(4);
  for (const idx in Objs) {
    Objs[idx].onUpdate(() => Objs[idx].use(k.z(Objs[idx].pos.y)));
  }
});
