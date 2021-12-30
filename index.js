import { k } from "./kaboom.js";
import { loadLevel1 } from "./Levels/level1.js";

const buttonPadding = 50;
k.loadSprite("background", "./Tiles/mainBackground.png");
loadLevel1();

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
    k.scale(2),
    "menuText",
  ]);

  const playButtonText = k.add([
    k.layer("ui"),
    k.text("play"),
    k.z(1),
    k.color(0, 0, 255),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/4 + menuTitle.height + 100),
    "playButtonText",
  ]);

  const playButton = k.add([
    k.rect(playButtonText.width + buttonPadding, playButtonText.height + buttonPadding),
    k.layer("ui"),
    k.color(1, 1, 1),
    k.origin("center"),
    k.area(),
    k.pos(k.width()/2, k.height()/4 + menuTitle.height + 100),
    "playButton",
  ]);

  k.onClick("playButton", () => k.go("game"));

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

  const situationOneText = k.add([
    k.text("one"),
    k.z(1),
    k.layer("ui"),
    k.color(0, 0, 255),
    k.origin("center"),
    k.pos(k.width()/4, k.height()/2),
    k.scale(0.5),
    "situationOneText",
  ]);

  const situationOne = k.add([
    k.rect(situationOneText.width + buttonPadding, situationOneText.height + buttonPadding),
    k.layer("ui"),
    k.color(1, 1, 1),
    k.origin("center"),
    k.scale(0.5),
    k.area(),
    k.pos(k.width()/4, k.height()/2),
    "situationOne",
  ]);

  k.onClick("situationOne", () => k.go("level1"));


  const situationTwoText = k.add([
    k.text("two"),
    k.z(1),
    k.layer("ui"),
    k.color(0, 0, 255),
    k.scale(0.5),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
    "situationTwoText",
  ]);

  const situationTwo = k.add([
    k.rect(situationTwoText.width + buttonPadding, situationTwoText.height + buttonPadding),
    k.layer("ui"),
    k.color(1, 1, 1),
    k.scale(0.5),
    k.origin("center"),
    k.area(),
    k.pos(k.width()/2, k.height()/2),
    "situationTwo",
  ]);


  const situationThreeText = k.add([
    k.text("three"),
    k.z(1),
    k.scale(0.5),
    k.layer("ui"),
    k.color(0, 0, 255),
    k.origin("center"),
    k.pos(k.width()/4 + k.width()/2, k.height()/2),
    "situationThreeText",
  ]);

  const situationThree = k.add([
    k.rect(situationThreeText.width + buttonPadding, situationThreeText.height + buttonPadding),
    k.layer("ui"),
    k.color(1, 1, 1),
    k.origin("center"),
    k.scale(0.5),
    k.area(),
    k.pos(k.width()/4 + k.width()/2, k.height()/2),
    "situationThree",
  ]);

});

k.go("menu");