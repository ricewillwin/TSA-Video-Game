import { k } from "./kaboom.js";
import { loadLevel1 } from "./maps/level1.js";
import { loadLevel2 } from "./maps/level2.js"
import { Button } from "./ui/button.js";
import { ButtonSeries } from "./ui/buttonSeries.js"
import { addLayers } from "./layers.js";
import { spriteLoader } from "./spriteLoader.js";

k.focus();
addLayers();
loadLevel1();
await k.loadSprite("background", "./sprites/main_bg.png");
await k.loadSound("menu", "./music/newtitlescreen.wav")
await k.loadSound("openworld", "./music/openworld.wav")

await spriteLoader.loadNPCs();
await spriteLoader.loadStructure();


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
      loadLevel2();
      k.go("level1");
      music.stop()
    }),
  ]);
  
  k.onKeyPress(["space", "enter"], () => {menuButtonSeries.push()});
});

k.go("menu");
