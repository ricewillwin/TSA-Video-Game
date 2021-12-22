kaboom({
  global: true,
  fullscreen: true,
  scale: 0.6,
  debug: true
})

scene("menu", () => {

  add([
    text("Hello"),
    pos(200,100)
  ])

})

go("menu");