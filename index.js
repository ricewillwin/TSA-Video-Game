import k from "./kaboom.js"
import sceneOne from "./Levels/level1.js"
import config from "./config.js"

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
    text("click Space to start"),
    z(1),
    color(0, 0, 255),
    origin("center"),
    scale(0.33),
    pos(width()/2, height()/4 + menuTitle.height + 100),
    "playButtonText",
  ])

  onKeyPress("space", () => {go("game")})

})
// Start the actual game
// 
// Cut scene then pick which situation
// After picking starter go to first level
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

  onKeyPress("enter", () => {go("level1")})

})

go("menu");