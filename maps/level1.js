import { k } from "../kaboom.js";
import { initializePlayer, player } from "../player.js";
import { GameMap } from "./index.js";
import { loadLevel2, loadLevel2a } from "./level2.js";
import { loadLevel3 } from "./level3.js";
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
await k.loadSound("openworld", "./music/openworld.wav");

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
      k.sprite("door_left"),
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
  },
  spawn: [17, 5],

};

export const Objs = {};

export const loadLevel1a = () => k.scene("level1Transition", async () => {
  thaw();
  const exposition = k.add([
    k.text("You are a spy during the Cold War"),
    k.scale(1.5),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
  ]);

  k.wait(3, () => {
    exposition.use(k.text("A dossier with your name and image\nhave been stolen by Russian operatives"));
  });

  k.wait(6, () => {
    exposition.use(k.text(
      "To retrieve the dossier\n\nYou must disguise yourself\n\nInfiltrate the party\n\nAnd steal it back."));
  });

  k.wait(10, () => {
    exposition.use(k.text(
      "Like any good spy\n\nYou must be able to use people to your advantage\n\nSo remember to communicate with the members of the party\n\n(while maintaining your cover, of course)\n\nFind your information before your identity is compromised!"));
  });

  k.wait(17, () => {
    exposition.use(k.text("Level Zero"));
    exposition.use(k.scale(3));
  });

  k.wait(19, () => {
    k.go("level1");
  });

  // k.onKeyPress("p", () => {
  //   loadLevel3();
  //   k.go("level3");
  // });
});

export const loadLevel1 = () => k.scene("level1", async () => {
  thaw();
  const music = k.play("openworld", {
    volume: 0.1,
  });
  music.loop();

  mapObj = new GameMap(mapArray);

  await initializePlayer("player", mapObj);

  Objs.bouncerLeft = k.add([
    k.sprite("bouncer_left", { anim: "idle" }),
    k.pos(286, 38),
    k.solid(),
    k.z(1),
    k.area({ width: 9, height: 16, offset: k.vec2(3, 0) }),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerLeft);

  Objs.bouncerRight = k.add([
    k.sprite("bouncer_right", { anim: "idle" }),
    k.pos(242, 38),
    k.solid(),
    k.z(1),
    k.area({ width: 9, height: 16, offset: k.vec2(4, 0) }),
    "NPC",
    "bouncer",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.bouncerRight);

  Objs.personOne = k.add([
    k.sprite("guy_one", { anim: "idle", animSpeed: 0.3 }),
    k.pos(14*16, 3.0*16),
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
    k.sprite("gal_one", { anim: "idle", animSpeed: 0.4 }),
    k.pos(12.5*16, 2.7*16),
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

  Objs.personThree = k.add([
    k.sprite("guy_eight", { anim: "idle", animSpeed: 0.2 }),
    k.pos(12*16, 2.8*16),
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
    k.sprite("guy_three", { anim: "idle", animSpeed: 0.5 }),
    k.pos(10.5*16, 2.7*16),
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
    k.sprite("gal_three", { anim: "idle", animSpeed: 0.1 }),
    k.pos(9.5*16, 2.4*16),
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

  k.onCollide("player", "door", () => {
    if (player.bouncerPermission) {
      music.stop();
      loadLevel2();
      loadLevel2a();
      k.go("level2Transition");
    }
  });

  k.camScale(4);

  Objs.playerCar = k.add([
    k.sprite("car_red"),
    k.pos((18*16), (5.5*16)),
    k.solid(),
    k.z(1),
    k.area({ width: 32, height: 16, offset: k.vec2(-32, 0) }),
    k.rotate(90),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.playerCar);

  Objs.yellowCar = k.add([
    k.sprite("car_yellow"),
    k.pos((23*16), (9.3*16)),
    k.solid(),
    k.z(1),
    k.area({ width: 32, height: 16 }),
    k.rotate(270),
    k.origin("center"),
  ]);

  Objs.greenCar = k.add([
    k.sprite("car_green"),
    k.pos((7*16), (6.5*16)),
    k.solid(),
    k.z(1),
    k.area({ width: 32, height: 16 }),
    k.rotate(90),
    k.origin("center"),
  ]);

  Objs.blockadeCar1 = k.add([
    k.sprite("car_red"),
    k.pos((4.4*16), (4*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
  ]);

  Objs.blockadeCar2 = k.add([
    k.sprite("car_blue"),
    k.pos((4.5*16), (6*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
    // "NPC",
    {
      dialogObj: null,
      dialogTextObj: null,
    },
  ]);
  createDialogText(Objs.blockadeCar2);

  Objs.blockadeCar3 = k.add([
    k.sprite("car_green"),
    k.pos((4.75*16), (8*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
  ]);

  Objs.blockadeCar4 = k.add([
    k.sprite("car_striped"),
    k.pos((4.6*16), (10*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
    k.rotate(180),
  ]);

  Objs.blockadeCar5 = k.add([
    k.sprite("car_striped"),
    k.pos((29.6*16), (4*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
  ]);

  Objs.blockadeCar6 = k.add([
    k.sprite("car_blue"),
    k.pos((29.2*16), (6*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
    k.rotate(180),
  ]);

  Objs.blockadeCar7 = k.add([
    k.sprite("car_green"),
    k.pos((29.4*16), (8*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
    k.rotate(180),
  ]);

  Objs.blockadeCar8 = k.add([
    k.sprite("car_yellow"),
    k.pos((29.5*16), (10*16)),
    k.solid(),
    k.z(1),
    k.area(),
    k.origin("center"),
  ]);

  loadLevel1Dialogs();
});

export const loadLevel1Dialogs = () => {
  let tempDialog;
  let tempUncreatedButtonSeries;
  Objs.bouncerLeft.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.bouncerLeft],
    null,
    new DialogLine(player, "Hello, I'm here for the party."),
    new DialogLine(Objs.bouncerLeft, "You're late. Who are you?"),
    new DialogChoice(
      player, (tempUncreatedButtonSeries = new UncreatedDialogButtonSeries(
        {
          text: "distract him",
          dialog: new Dialog(
            [player, Objs.bouncerLeft],
            null,
            new DialogLine(player, "Hey, look over there!"),
            new DialogLine(player, "It's a distraction!"),
            new DialogLine(Objs.bouncerLeft, "Nice try."),
            new DialogLose(Objs.bouncerLeft),
          ),
        },
        {
          text: "be a guard",
          dialog: new Dialog(
            [player, Objs.bouncerLeft],
            new Dialog(
              [player, Objs.bouncerLeft],
              null,
              new DialogLine(Objs.bouncerLeft, "What do you want? Go in already!"),
              new DialogLine(player, "Alright, alright. I was just being friendly."),
              new DialogLine(Objs.bouncerLeft, "I still don't trust you."),
              new DialogLine(Objs.bouncerLeft, ""),
            ),
            new DialogLine(player, "I'm actually a guard working here."),
            new DialogLine(player, "I'm just a bit late, please don't tell anyone..."),
            new DialogLine(Objs.bouncerLeft, "Hmm..."),
            new DialogLine(Objs.bouncerLeft, "Alright..."),
            new DialogLine(Objs.bouncerLeft, "I'll let you in, but I've got an eye on you.",
              () => k.wait(3, () => player.bouncerPermission = true)),
            new DialogLine(Objs.bouncerLeft, ""),
          ),
        },
        {
          text: "send him away",
          dialog: new Dialog(
            [player, Objs.bouncerLeft],
            null,
            new DialogLine(player, "There's an emergency on the south side of the building!"),
            new DialogLine(player, "Someone just got shot!"),
            new DialogLine(Objs.bouncerLeft, "..."),
            new DialogLine(Objs.bouncerLeft, "You just arrived in a car."),
            new DialogLine(Objs.bouncerLeft, "How do you know what's happening\non the south side?"),
            new DialogLose(Objs.bouncerLeft),
          ),
        },
      )),
    ),
  )));
  tempUncreatedButtonSeries.dialog = tempDialog;

  Objs.bouncerRight.dialogObj = new DialogHandler((tempDialog = new Dialog(
    [player, Objs.bouncerLeft, Objs.bouncerRight],
    null,
    new DialogLine(player, "Hello, I'm here for the party."),
    new DialogLine(Objs.bouncerRight, "YEAH? WELL, NO!"),
    new DialogLine(Objs.bouncerRight, "I'm a BOUNCER!"),
    new DialogLine(Objs.bouncerRight, "And you've been BOUNCED!!!"),
    new DialogChoice(player, (tempUncreatedButtonSeries = new UncreatedDialogButtonSeries(
        {
          text: "fight fire with fire",
          dialog: new Dialog(
            [player, Objs.bouncerLeft, Objs.bouncerRight],
            new Dialog(
              [player, Objs.bouncerLeft, Objs.bouncerRight],
              null,
              new DialogLine(player, "B-B-B-BOUNCED!"),
              new DialogLine(Objs.bouncerRight, "NO!!!!!"),
              new DialogLine(Objs.bouncerRight, "You've bounced me AGAIN!!"),
              new DialogLine(Objs.bouncerRight, ""),
            ),
            new DialogLine(player, "YEAH? WELL, GUESS WHAT!"),
            new DialogLine(player, "I BOUNCE YOU!!"),
            new DialogLine(player, "AND NO BOUNCE BACKS!!!"),
            new DialogLine(Objs.bouncerRight, "*sputters*"),
            new DialogLine(Objs.bouncerRight, "but..."),
            new DialogLine(Objs.bouncerRight, "you can't out-bounce\nthe bouncer..."),
          ),
        },
        {
          text: "turn to the other bouncer",
          dialog: new Dialog(
            [player, Objs.bouncerLeft, Objs.bouncerRight],
            new Dialog(
              [player, Objs.bouncerLeft, Objs.bouncerRight],
              null,
              new DialogLine(Objs.bouncerRight, "BOUNCEBOUNCEBOUNCE!!!"),
              new DialogLine(Objs.bouncerRight, ""),
            ),
            new DialogLine(player, "...what...?"),
            new DialogLine(Objs.bouncerLeft, "Don't mind him,"),
            new DialogLine(Objs.bouncerLeft, "he's just excited\nabout his job."),
          ),
        },
        {
          text: "you can't bounce a spy",
          dialog: new Dialog(
            [player, Objs.bouncerLeft, Objs.bouncerRight],
            null,
            new DialogLine(player, "Yeah? Well, you can't bounce a spy,\nit's against the rules."),
            new DialogLine(Objs.bouncerLeft, "Did he say spy?"),
            new DialogLose(Objs.bouncerLeft),
          ),
        },
      )),
    ),
  )));
  tempUncreatedButtonSeries.dialog = tempDialog;
};
