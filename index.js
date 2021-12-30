import { k } from "./kaboom.js";
import { loadLevel1 } from "./Levels/level1.js";
import { addButton } from "./spriteMaker.js";
import { addLayers } from "./layers.js";

k.loadSprite("background", "./Tiles/mainBackground.png");
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
    k.scale(2),
    "menuText",
  ]);

  const { playButtonText, playButton } = addButton(
    "play",
    k.width()/2,
    k.height()/4 + menuTitle.height + 100,
    1,
    [0, 0, 255],
    [1, 1, 1],
    ["playButtonText"],
    ["playButton"],
  );

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

  const { situationOneText, situationOne } = addButton(
    "one",
    k.width()/4,
    k.height()/2,
    0.5,
    [0, 0, 255],
    [1, 1, 1],
    ["situationOneText"],
    ["situationOne"],
  );

  k.onClick("situationOne", () => k.go("level1"));

  const { situationTwoText, situationTwo } = addButton(
    "two",
    k.width()/2,
    k.height()/2,
    0.5,
    [0, 0, 255],
    [1, 1, 1],
    ["situationTwoText"],
    ["situationTwo"],
  );

  const { situationThreeText, situationThree } = addButton(
    "three",
    3*k.width()/4,
    k.height()/2,
    0.5,
    [0, 0, 255],
    [1, 1, 1],
    ["situationThreeText"],
    ["situationThree"],
  );
});

k.go("menu");