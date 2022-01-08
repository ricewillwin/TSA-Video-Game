import { k } from "../kaboom.js";
import { initializePlayer, player, BASE_SPEED } from "../player.js";
import { loadLevel4, loadLevel4a } from "./level4.js"
import { GameMap } from "./index.js";

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

export const loadLevel3a = () => k.scene("level3Transistion", async () => {
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
  

  const bouncerLeft = k.add([
    k.sprite("bouncer_left", {anim: "idle"}),
    k.pos((11*16), (0.4*16)),
    k.solid(),
    k.z(1),
    k.area({ width: 9, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);
  
  



  const personOne = k.add([
    k.sprite("guy_eight", {anim: "idle", animSpeed: 0.3}),
    k.pos(2.5*16,3*16),
    k.solid(),
    k.z(1),
    k.area({ width: 7, height: 16, offset: k.vec2(4, 0) }),
    "napkin_dude",
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);

  const personTwo = k.add([
    k.sprite("guy_three", {anim: "idle", animSpeed: 0.4}),
    k.pos(1.5*16,5.2*16),
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
  
  const personFour = k.add([
    k.sprite("guy_two", {anim: "idle", animSpeed: 0.6}),
    k.pos(2*16,2.9*16),
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

  const tableOne = k.add([
    k.sprite("dancetable"),
    k.pos(2.3*16,3.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  
  const personSix = k.add([
    k.sprite("gal_two", {anim: "idle", animSpeed: 0.5}),
    k.pos(5.7*16,6.6*16),
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
  
  const personThree = k.add([
    k.sprite("gal_three", {anim: "idle", animSpeed: 0.4}),
    k.pos(5.5*16,7.2*16),
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
  
  const personFive = k.add([
    k.sprite("guy_four", {anim: "idle", animSpeed: 0.2}),
    k.pos(6.3*16,7.1*16),
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
  
  const personSeven = k.add([
    k.sprite("gal_one", {anim: "idle", animSpeed: 0.2}),
    k.pos(2.1*16,5.3*16),
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

  const tableTwo = k.add([
    k.sprite("dancetable"),
    k.pos(1.7*16,5.7*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);



  const personEight = k.add([
    k.sprite("guy_eight", {anim: "idle", animSpeed: 0.3}),
    k.pos(14.5*16,4*16),
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

  const personThirteen = k.add([
    k.sprite("guy_five", {anim: "idle", animSpeed: 0.6}),
    k.pos(13.8*16,4.1*16),
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

  const tableFour = k.add([
    k.sprite("dancetable"),
    k.pos(14.3*16,4.5*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);
  
  const personNine = k.add([
    k.sprite("guy_one", {anim: "idle", animSpeed: 0.4}),
    k.pos(15.5*16,1.2*16),
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
  
  const personTen = k.add([
    k.sprite("gal_one", {anim: "idle", animSpeed: 0.2}),
    k.pos(16.1*16,1.3*16),
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

  const tableThree = k.add([
    k.sprite("dancetable"),
    k.pos(15.7*16,1.7*16),
    k.solid(),
    k.z(1),
    k.area(),
  ]);

  const personEleven = k.add([
    k.sprite("gal_four", {anim: "idle", animSpeed: 0.5}),
    k.pos(15.8*16,5.6*16),
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

  const personTwelve = k.add([
    k.sprite("gal_three", {anim: "idle", animSpeed: 0.4}),
    k.pos(15.5*16,6.1*16),
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

  const personFourteen = k.add([
    k.sprite("guy_nine", {anim: "idle", animSpeed: 0.2}),
    k.pos(16.2*16,6.2*16),
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



  const personFifteen = k.add([
    k.sprite("dancers_one", {anim: "idle", animSpeed: 0.4}),
    k.pos(6*16,3*16),
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

  const personSeventeen = k.add([
    k.sprite("dancers_one", {anim: "idle", animSpeed: 0.6}),
    k.pos(11*16,2*16),
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

  

  const personSixteen = k.add([
    k.sprite("dancers_two", {anim: "idle", animSpeed: 0.2}),
    k.pos(12*16,6*16),
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




  const musicianOne = k.add([
    k.sprite("musician", {anim: "idle", animSpeed: 0.2}),
    k.pos(5*16,1.2*16),
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

  const musicianTwo = k.add([
    k.sprite("musician", {anim: "idle", animSpeed: 0.2}),
    k.pos(6.2*16, 1.3*16),
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

  const musicianThree = k.add([
    k.sprite("musician", {anim: "idle", animSpeed: 0.2}),
    k.pos(7.4*16, 1.1*16),
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

  k.onCollide("player", "napkin_dude", () => {
    player.keythree = "napkin";
  }),

  k.onCollide("player", "nextdoor", () => {
    if(player.keythree == "napkin") {
      music.stop();
      loadLevel4();
      loadLevel4a();
      k.go("level4Transistion");
    }
  });

  k.camScale(4);
});
