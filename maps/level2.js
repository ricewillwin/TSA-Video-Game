import { k } from "../kaboom.js";
import { initializePlayer, player, BASE_SPEED } from "../player.js";
import { GameMap } from "./index.js";
import { loadLevel3, loadLevel3a } from "./level3.js"
import {
  createDialogText,
  Dialog,
  DialogChoice,
  DialogHandler,
  DialogLine,
  DialogLose,
  DialogPart,
} from "../ui/dialog.js";
import { UncreatedDialogButtonSeries } from "../ui/dialogButtonSeries.js";
import { thaw } from "../input.js";

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
      "obj",
    ]),
    "(": (ctx) => ([
      k.sprite( "door_left"),
      k.area(),
      k.solid(),
      "nextdoor",
      "obj",
    ]),
    ")": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
      "nextdoor",
      "obj",
    ]),
    "{": (ctx) => ([
      k.sprite( "door_left"),
      k.area(),
      k.solid(),
      "exitdoor",
      "obj",
    ]),
    "}": (ctx) => ([
      k.sprite("door_right"),
      k.area(),
      k.solid(),
      "exitdoor",
      "obj",
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
    "obj",
    k.area({ width: 48, height: 34, offset: k.vec2(0, -2)}),
  ]);

  Objs.bouncerRight = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos((5.5*16), (0.9*16)),
    k.solid(),
    k.origin("center"),
    k.area({ width: 9, height: 5, offset: k.vec2(0.5, 3) }),
    // "NPC",
    "bouncer",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerRight);

  Objs.billiardguy_redhair = k.add([
    k.sprite("billiardguy_redhair", {anim: "idle", animSpeed: 0.2}),
    k.pos((5*16), (4.3*16)),
    k.solid(),
    k.origin("center"),
    k.area({ width: 5, height: 5, offset: k.vec2(-0.5, 3) }),
     "NPC",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.billiardguy_redhair);

  Objs.billiardguy_brownhair = k.add([
    k.sprite("billiardguy_brownhair", {anim: "idle", animSpeed: 0.3}),
    k.pos((9*16), (4.7*16)),
    k.solid(),
    k.origin("center"),
    k.area({ width: 5, height: 5, offset: k.vec2(-0.5, 3) }),
     "NPC",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.billiardguy_brownhair);

  Objs.lighterguy = k.add([
    k.sprite("lighterguy", {anim: "idle", animSpeed: 0.3}),
    k.pos((12*16), (1.8*16)),
    k.solid(),
    k.z(2),
    k.area({ width: 7, height: 15, offset: k.vec2(4, 1) }),
    // "NPC",
    "lighter_dude",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.lighterguy);

  Objs.redshirt_blackpants = k.add([
    k.sprite("redshirt_blackpants", {anim: "idle", animSpeed: 0.3}),
    k.pos(3*16,3.5*16),
    k.solid(),
    k.origin("center"),
    k.area({ width: 7, height: 5, offset: k.vec2(-0.5, 3) }),
     "NPC",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.redshirt_blackpants);

  Objs.brownshirt_greypants = k.add([
    k.sprite("brownshirt_greypants", {anim: "idle", animSpeed: 0.4}),
    k.pos(2*16,5.7*16),
    k.solid(),
    k.origin("center"),
    k.area({ width: 7, height: 5, offset: k.vec2(-0.5, 3) }),
     "NPC",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.brownshirt_greypants);

  Objs.whitehair_reddress = k.add([
    k.sprite("whitehair_reddress", {anim: "idle", animSpeed: 0.2}),
    k.pos(2.6*16,5.8*16),
    k.solid(),
    k.origin("center"),
    k.area({ width: 6, height: 5, offset: k.vec2(0, 3) }),
    "NPC",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.whitehair_reddress);

  Objs.redhair_purpledress = k.add([
    k.sprite("redhair_purpledress", {anim: "idle", animSpeed: 0.5}),
    k.pos(10.3*16,7.1*16),
    k.solid(),
    k.origin("center"),
    k.area({ width: 5, height: 5, offset: k.vec2(0, 3) }),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.redhair_purpledress);

  Objs.brownhair_bluedress = k.add([
    k.sprite("brownhair_bluedress", {anim: "idle", animSpeed: 0.4}),
    k.pos(10*16,7.7*16),
    k.solid(),
    k.origin("center"),
    k.area({ width: 6, height: 5, offset: k.vec2(0, 3) }),
     "NPC",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.brownhair_bluedress);

  Objs.brownshirt_tanpants = k.add([
    k.sprite("brownshirt_tanpants", {anim: "idle", animSpeed: 0.6}),
    k.pos(2.5*16,3.4*16),
    k.solid(),
    k.origin("center"),
    k.area({ width: 7, height: 5, offset: k.vec2(-0.5, 3) }),
     "NPC",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.brownshirt_tanpants);

  Objs.greenshirt_blackpants = k.add([
    k.sprite("greenshirt_blackpants", {anim: "idle", animSpeed: 0.2}),
    k.pos(10.8*16,7.6*16),
    k.solid(),
    k.origin("center"),
    k.area({ width: 8, height: 5, offset: k.vec2(0, 3) }),
    // "NPC",
    "obj",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.greenshirt_blackpants);

  

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
  for (const idx in Objs) {
    Objs[idx].onUpdate(() => Objs[idx].use(k.z(Objs[idx].pos.y)));
  }
});

export const loadLevel2Dialogs = () => {
  let tempDialog;
  let tempUncreatedButtonSeries;
  Objs.brownhair_bluedress.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.brownhair_bluedress],
    null,
    new DialogLine(player, "Hello."),
    new DialogLine(Objs.brownhair_bluedress, "Welcome to the Billiards Room!"),
    
  )));
  Objs.whitehair_reddress.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.whitehair_reddress],
    null,
    new DialogLine(player, "Hello."),
    new DialogLine(Objs.whitehair_reddress, "Talk to the man with the lighter\n to get a clue about how to move on."),
    
  )));
  Objs.brownshirt_tanpants.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.brownshirt_tanpants],
    null,
    new DialogLine(player, "Hello."),
    new DialogLine(Objs.brownshirt_tanpants, "If only we had a lighter to get into the next room."),
    
  )));
  Objs.redshirt_blackpants.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.redshirt_blackpants],
    null,
    new DialogLine(player, "Hello."),
    new DialogLine(Objs.redshirt_blackpants, "If only we had a lighter to get into the next room."),
    
  )));
  Objs.brownshirt_greypants.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.brownshirt_greypants],
    null,
    new DialogLine(player, "Hello."),
    new DialogLine(Objs.brownshirt_greypants, "Talk to the man with the lighter\n to get a clue about how to move on."),
    
  )));
  Objs.billiardguy_redhair.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.billiardguy_redhair],
    null,
    new DialogLine(player, "Are you good at Billiards?"),
    new DialogLine(Objs.billiardguy_redhair, "Yes the best."),
    new DialogLine(Objs.billiardguy_redhair, "Don't tell Vladimir, but he is horrible."),
  )));
  
  Objs.billiardguy_brownhair.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.billiardguy_brownhair],
    null,
    new DialogLine(player, "Are you going to win at this game of Billiards?"),
    new DialogLine(Objs.billiardguy_brownhair, "One hundred percent. \nIn fact, I am willing to bet on it."),
    new DialogChoice(
      player, (tempUncreatedButtonSeries = new UncreatedDialogButtonSeries(
        {
          text: "sure",
          dialog: new Dialog(
            [player, Objs.billiardguy_brownhair],
            null,
            new DialogLine(player,"sure"),
            new DialogLine(Objs.billiardguy_brownhair,"Actually, I am feeling a little sick.\n It must be gambling addiction." ),
            new DialogLine(Objs.billiardguy_brownhair, "Educational lesson: don't gamble under 18, or if it is illegal.")
          ),
        },
        {
          text: "no",
          dialog: new Dialog(
            [player, Objs.billiardguy_brownhair],
            new Dialog(
              [player, Objs.billiardguy_brownhair],
              null,
              new DialogLine(player,"no"),
              new DialogLine(Objs.billiardguy_brownhair,"Fine then. Since I am under 18, I should gamble anyways.")
            ),
            
          ),
        },
        {
          text: "maybe later",
          dialog: new Dialog(
            [player, Objs.billiardguy_brownhair],
            null,
            new DialogLine(player,"maybe later"),
            new DialogLine(Objs.billiardguy_brownhair,"Fine then. Since I am under 18, I should gamble anyways.")
          ),
        },
      )),
    ),
  )));
  tempUncreatedButtonSeries.dialog = tempDialog;
  Objs.lighterguy.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.lighterguy],
    null,
    new DialogLine(Objs.lighterguy, "Want to talk about fire? It is my favorite thing."),
    
    new DialogChoice(
      player, (tempUncreatedButtonSeries = new UncreatedDialogButtonSeries(
        {
          text: "sure",
          dialog: new Dialog(
            [player, Objs.lighterguy],
            null,
            new DialogLine(player,"sure"),
            new DialogLine(Objs.lighterguy,"Fire is extremely dangerous, so take caution with the /nlighter I just gave you" ),
            
          ),
        },
        {
          text: "no",
          dialog: new Dialog(
            [player, Objs.lighterguy],
            new Dialog(
              [player, Objs.lighterguy],
              null,
              new DialogLine(player,"no"),
              new DialogLine(Objs.lighterguy, "good job on being safe around fire.\nunfortunately, you need it to move on"),
              new DialogLose(player),
            ),
            
          ),
        },
        {
          text: "maybe later",
          dialog: new Dialog(
            [player, Objs.lighterguy],
            null,
            new DialogLine(player, "maybe later"),
            new DialogLine(Objs.lighterguy, "Fine then. Meet me later.")
          ),
        },
      )),
    ),
  )));
  tempUncreatedButtonSeries.dialog = tempDialog;
};