kaboom({
  global: true,
  fullscreen: true, 
  scale: 1,
  debug: true
})

scene("menu", () => {

  add([
    text("Hello"),
    pos(200,100)
  ])

})

go("menu");