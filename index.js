import { k } from "./kaboom.js";
import { loadLevel1 } from "./Levels/level1.js";
import { Button } from "./ui/button.js";
import { ButtonSeries } from "./ui/buttonSeries.js"
import { addLayers } from "./layers.js";

k.loadSprite("background", "./sprites/main_bg.png");
loadLevel1();
addLayers();

k.scene("menu", () => {

  k.add([
    k.sprite("background"),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
    k.layer("bg"),
    k.area(),
    k.scale(3.75),
  ]);

  const menuTitle = k.add([
    k.text(" iSpy "),
    k.layer("ui"),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/4),
    k.scale(0.75),
    "menuText",
  ]);

  const menuButtonSeries = new ButtonSeries([
    new Button({
      name: "play",
      x: k.width()/2,
      y: k.height()/4 + menuTitle.height + 100,
    }, () => { k.go("game"); }),
  ]);

  k.onKeyPress(["space", "enter"], () => {menuButtonSeries.push()});
});

// Start the actual game
// 
// Cut scene then pick which situation
// After picking starter go to first level
k.scene("game", () => {

  k.add([
    k.text("situation"),
    k.pos(k.width()/2, k.height()/4),
    k.origin("center"),
    k.scale(0.8),
    "situationText",
  ]);

  const situationButtonSeries = new ButtonSeries([
    new Button({
      name: "situationOne",
      text: "one",
      x: k.width()/4,
      y: k.height()/2,
      scale: 0.5,
    }, () => k.go("level1")),
    new Button({
      name: "situationTwo",
      text: "two",
      x: k.width()/2,
      y: k.height()/2,
      scale: 0.5,
    }, () => k.debug.log("2")),
    new Button({
      name: "situationThree",
      text: "three",
      x: 3*k.width()/4,
      y: k.height()/2,
      scale: 0.5,
    }, () => k.debug.log("3")),
  ], 2);

  k.onKeyPress(["left", "a"], () => situationButtonSeries.back());
  k.onKeyPress(["right", "d"], () => situationButtonSeries.fwd());
  k.onKeyPress(["space", "enter"], () => situationButtonSeries.push());
});

k.go("menu");
