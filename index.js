kaboom({
  global: true,
  fullscreen: true, 
  scale: 1,
  debug: true
})

scene("menu", () => {

  add([
    text("Hello"),
    pos(width()/2,height()/2),
    origin("center")
  ])

})

go("menu");