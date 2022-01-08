import { k } from "./kaboom.js";
import { loadLevel1, loadLevel1a } from "./maps/level1.js";
import { loadLevel2 } from "./maps/level2.js"
import { Button } from "./ui/button.js";
import { ButtonSeries } from "./ui/buttonSeries.js"
import { addLayers } from "./layers.js";
import { spriteLoader } from "./spriteLoader.js";
import { keys } from "./player.js";

k.focus();
addLayers();

k.scene("loading", () => {
  k.add([
    k.text("loading"),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
  ])
})

k.go("loading");

await k.loadSprite("background", "./sprites/main_bg.png");
await k.loadSound("menu", "./music/newtitlescreen.wav")

await spriteLoader.loadNPCs();
await spriteLoader.loadStructure();
await spriteLoader.loadObjects();

k.scene("menu", () => {
  const music = k.play("menu", {
    volume: 0.1,
  });
  music.loop();

  k.add([
    k.sprite("background"),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/2),
    k.layer("bg"),
    k.area(),
    k.scale(3.75),
  ]);
  
 
  
  const menuTitle = k.add([
    k.text("iSpy"),
    k.layer("ui"),
    k.origin("center"),
    k.color(40, 40, 40),
    k.pos(k.width()/2, k.height()/4),
    k.scale(5),
    "menuText",
  ]);

  const menuButtonSeries = new ButtonSeries([
    new Button({
      name: "press [Space] to start",
      scale: 1.75,
      x: k.width()/2,
      y: k.height()/4 + menuTitle.height + 100,
    }, () => { 
      loadLevel1();
      loadLevel1a();
      k.go("level1Transition");
      music.stop();
    }),
  ]);
  
  k.onKeyPress(keys.INTERACT, () => {menuButtonSeries.push()});
});

k.go("menu");
