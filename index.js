kaboom({
  global: true,
  fullscreen: true, 
  scale: 1,
  debug: true
})

scene("menu", () => {

  layers([
    "bg",
    "game",
    "ui",
    "button",
    "text",
], "text")

  const menuTitle = add([
    text("iSpy"),
    layer("text"),
    origin("center"),
    pos(width()/2, height()/4),
    scale(2),
    "menuText",
  ])

  const playButtonText = add([
    text("play"),
    layer("text"),
    color(0, 0, 255),
    origin("center"),
    pos(width()/2, height()/4 + menuTitle.height + 100),
    "playButtonText",
  ])

  const playButton = add([
    rect(playButtonText.width + 20, playButtonText.height + 20),
    layer("button"),
    color(1, 1, 1),
    origin("center"),
    area(),
    pos(width()/2, height()/4 + menuTitle.height + 100),
    "playButton",
  ])

  onClick("playButton", () => go("game"))

})

scene("game", () => {

  add([
    text("gamer")
  ])

})

go("menu");