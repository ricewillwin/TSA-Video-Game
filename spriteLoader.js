import { k } from "./kaboom.js"

export const spriteLoader = {
  loadStructure: async () => {
    await k.loadSprite("door_left", "./sprites/tiles/DoorClosed.png");
    await k.loadSprite("door_right", "./sprites/tiles/DoorClosedRight.png");
    await k.loadSprite("pavement", "./sprites/tiles/pavement.png");
    await k.loadSprite("pavement_horiz", "./sprites/tiles/pavement_horiz.png");
    await k.loadSprite("pavement_vert", "./sprites/tiles/pavement_vert.png");
    await k.loadSprite("pavement_junction_up", "./sprites/tiles/pavement_junction_up.png");
    await k.loadSprite("sidewalk", "./sprites/tiles/sidewalk.png");
    await k.loadSprite("wall_stone", "./sprites/tiles/wall_stone.png");
    await k.loadSprite("wood_floor", "./sprites/tiles/wood_floor.png");
    await k.loadSprite("table", "./sprites/tiles/table.png");
    
  },
  loadPlayers: async () => {
    await k.loadSprite("player", "sprites/players/player.png", {
      sliceX: 5,
      sliceY: 6,
      anims: {
        "left_grab": { "from": 0, "to": 3 },
        "left_walk": { "from": 5, "to": 8, "loop": true },
        "left_idle": { "from": 10, "to": 14, "loop": true },
        "right_grab": { "from": 15, "to": 18 },
        "right_walk": { "from": 20, "to": 23, "loop": true },
        "right_idle": { "from": 25, "to": 29, "loop": true },
      },
    });
  },
  loadNPCs: async () => {
    await k.loadSprite("bouncer_left", "./sprites/NPCs/idlebouncer2.png", {
      sliceX: 5,
      sliceY: 1,
      anims: {
        idle: {
          from: 0,
          to: 4,
          loop: true
        }
      }
    });
    await k.loadSprite("bouncer_right", "./sprites/NPCs/idlebouncer2right.png", {
      sliceX: 5,
      sliceY: 1,
      anims: {
        idle: {
          from: 0,
          to: 4,
          loop: true
        }
      }
    });
  },
  loadObjects: async () => {
    await k.loadSpriteAtlas("./sprites/objects/cars.png", {
      "car_red": {
        "x": 0,
        "y": 0,
        "width": 16,
        "height": 64,
        "sliceY": 4,
      },
      "car_blue": {
        "x": 16,
        "y": 0,
        "width": 16,
        "height": 64,
        "sliceY": 4,
      },
      "car_yellow": {
        "x": 32,
        "y": 0,
        "width": 16,
        "height": 64,
        "sliceY": 4,
      },
      "car_green": {
        "x": 64,
        "y": 0,
        "width": 16,
        "height": 64,
        "sliceY": 4,
      },
      "car_striped": {
        "x": 80,
        "y": 0,
        "width": 16,
        "height": 64,
        "sliceY": 4,
      },
    });
  },
};
