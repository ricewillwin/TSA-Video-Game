import k from "./kaboom.js"
import sceneOne from "./Levels/level1.js"

loadSprite("background", "./Tiles/mainBackground.png")

scene("menu", () => {



  add([
    sprite("background"),
    origin("center"),
    pos(width()/2, height()/2),
    layer("bg"),
    area(),
    scale(3.75),
  ])

  const menuTitle = add([
    text("iSpy"),
    layer("ui"),
    origin("center"),
    pos(width()/2, height()/4),
    scale(0.75),
    "menuText",
  ])

  const playButtonText = add([
    layer("ui"),
    text("play"),
    z(1),
    color(0, 0, 255),
    origin("center"),
    scale(0.5),
    pos(width()/2, height()/4 + menuTitle.height + 100),
    "playButtonText",
  ])

  const playButton = add([
    rect(playButtonText.width, playButtonText.height),
    layer("ui"),
    color(1, 1, 1),
    origin("center"),
    area(),
    pos(width()/2, height()/4 + menuTitle.height + 100),
    "playButton",
  ])

  onClick("playButton", () => go("game"))

})

// Start the actual game
// 
// Cut scene then pick which situation
// After picng starter go to first level
scene("game", () => {

  add([
    text("situation"),
    pos(width()/2, height()/4),
    origin("center"),
    scale(0.8),
    "situationText"
  ])





  const situationOneText = add([
    text("one"),
    z(1),
    layer("ui"),
    color(0, 0, 255),
    origin("center"),
    pos(width()/4, height()/2),
    scale(0.5),
    "situationOneText",
  ])

  const situationOne = add([
    rect(situationOneText.width, situationOneText.height),
    layer("ui"),
    color(1, 1, 1),
    origin("center"),
    scale(0.5),
    area(),
    pos(width()/4, height()/2),
    "situationOne",
  ])

  onClick("situationOne", () => go("level1"))





  const situationTwoText = add([
    text("two"),
    z(1),
    layer("ui"),
    color(0, 0, 255),
    scale(0.5),
    origin("center"),
    pos(width()/2, height()/2),
    "situationTwoText",
  ])

  const situationTwo = add([
    rect(situationTwoText.width, situationTwoText.height),
    layer("ui"),
    color(1, 1, 1),
    scale(0.5),
    origin("center"),
    area(),
    pos(width()/2, height()/2),
    "situationTwo",
  ])





  const situationThreeText = add([
    text("three"),
    z(1),
    scale(0.5),
    layer("ui"),
    color(0, 0, 255),
    origin("center"),
    pos(width()/4 + width()/2, height()/2),
    "situationThreeText",
  ])

  const situationThree = add([
    rect(situationThreeText.width, situationThreeText.height),
    layer("ui"),
    color(1, 1, 1),
    origin("center"),
    scale(0.5),
    area(),
    pos(width()/4 + width()/2, height()/2),
    "situationThree",
  ])

})

go("menu");