import { k } from "../kaboom.js";
import { initializePlayer, player } from "../player.js";
import { GameMap } from "./index.js";
import { loadLevel2, loadLevel2a } from "./level2.js";
import { DialogChoice, DialogLine, nextDialog } from "../ui/dialog.js";
import { UncreatedDialogButtonSeries } from "../ui/dialogButtonSeries.js";

export var mapObj = null;
await k.loadSound("openworld", "./music/openworld.wav")

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

export const loadLevel1a = () => k.scene("level1Transition", async () => {

  const exposition = k.add([
    k.text("You are a spy during the Cold War"),
    k.scale(1),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
  ]);

  k.wait(5, () => {
    exposition.use(k.text("A dossier with your name and image have been stolen by Russian operatives"));
  });

  k.wait(10, () => {
    exposition.use(k.text("To retrieve the dossier\nYou must disguise yourself as a security guard\nInfiltrate the party\nAnd steal it back."));
  });

  k.wait(15, () => {
    exposition.use(k.text("Like any good spy\nYou must be able to use people to your advantage\nSo remember to communicate with the members of the party\n(while maintaining your cover, of course)\nFind your information before your identity is compromised!"));
  });

  k.wait(27, () => {
    exposition.use(k.text("Level Zero"));
    exposition.use(k.scale(3));
  });

  k.wait(29, () => {
    k.go("level1")
  });
});

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
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Press [Space] to go to next line of dialog",
               "You're good, go in"]
    },
  ]);

  const bouncerRight = k.add([
    k.sprite("bouncer_right", {anim: "idle"}),
    k.pos(242,38),
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

  k.onCollide("player", "bouncer", () => {
    player.keyone = "explained";
  });


  k.onCollide("player", "door", () => {
    if (player.keyone === "explained") {
      loadLevel2();
      loadLevel2a();
      k.go("level2Transition");
      music.stop()
    }
  });

  k.camScale(4);

  const redCar = k.add([
    k.sprite("car_red"),
    k.pos((18*16),(5.5*16)),
    k.solid(),
    k.z(1),
    k.area({width: 32, height: 16, offset: k.vec2(-32, 0)}),
    k.rotate(90),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Go get those files",
               "Don't get caught"]
    },
    
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
    k.origin("center"),
    "NPC",
    {
      dialogObj: null,
      currentDialog: 0,
      dialog: ["Why do I exist?",
               "Cars shouldn't be alive."]
    },
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

  let bouncerLeftParts = [
    new DialogLine(player, "Hello, I'm here for the party."),
    new DialogLine(bouncerLeft, "Who are you?"),
    new DialogChoice(player, new UncreatedDialogButtonSeries(
      { text: "distract", dialog: new Dialog([player, bouncerLeft], null, [
            new DialogLine(player, "Hey, look over there! It's a distraction!"),
            new DialogLine(bouncerLeft, "Nice try."),
          ])
      })
    )
  ]
});
