import k from "/kaboom.js"
import sceneOne from "/Levels/level1.js"

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
    rect(playButtonText.width + 20, playButtonText.height + 20),
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
    text("gamer")
  ])

  const playButtonText = add([
    text("play"),
    z(1),
    layer("ui"),
    color(0, 0, 255),
    origin("center"),
    pos(width()/2, height()/4 + 100),
    "playButtonText",
  ])

  const playButton = add([
    rect(playButtonText.width + 20, playButtonText.height + 20),
    layer("ui"),
    color(1, 1, 1),
    origin("center"),
    area(),
    pos(width()/2, height()/4 + 100),
    "playButton",
  ])

  onClick("playButton", () => go("level1"))

})

go("menu");