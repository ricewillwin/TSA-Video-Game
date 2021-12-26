import k from "./kaboom.js"
import sceneOne from "./Levels/level1.js"

const buttonPadding = 50

scene("menu", () => {

  const menuTitle = add([
    text("iSpy"),
    layer("ui"),
    origin("center"),
    pos(width()/2, height()/4),
    scale(2),
    "menuText",
  ])

  const playButtonText = add([
    layer("ui"),
    text("play"),
    z(1),
    color(0, 0, 255),
    origin("center"),
    pos(width()/2, height()/4 + menuTitle.height + 100),
    "playButtonText",
  ])

  const playButton = add([
    rect(playButtonText.width + buttonPadding, playButtonText.height + buttonPadding),
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
    "situationText"
  ])





  const situationOneText = add([
    text("one"),
    z(1),
    layer("ui"),
    color(0, 0, 255),
    origin("center"),
    pos(width()/4, height()/2),
    "situationOneText",
  ])

  const situationOne = add([
    rect(situationOneText.width + buttonPadding, situationOneText.height + buttonPadding),
    layer("ui"),
    color(1, 1, 1),
    origin("center"),
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
    origin("center"),
    pos(width()/2, height()/2),
    "situationTwoText",
  ])

  const situationTwo = add([
    rect(situationTwoText.width + buttonPadding, situationTwoText.height + buttonPadding),
    layer("ui"),
    color(1, 1, 1),
    origin("center"),
    area(),
    pos(width()/2, height()/2),
    "situationTwo",
  ])





  const situationThreeText = add([
    text("three"),
    z(1),
    layer("ui"),
    color(0, 0, 255),
    origin("center"),
    pos(width()/4 + width()/2, height()/2),
    "situationThreeText",
  ])

  const situationThree = add([
    rect(situationThreeText.width + buttonPadding, situationThreeText.height + buttonPadding),
    layer("ui"),
    color(1, 1, 1),
    origin("center"),
    area(),
    pos(width()/4 + width()/2, height()/2),
    "situationThree",
  ])

})

go("menu");