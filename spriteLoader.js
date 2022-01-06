import { k } from "./kaboom.js"

export const spriteLoader = {
  loadStructure: async () => {
    await k.loadSprite("door_left", "sprites/tiles/door_left.png");
    await k.loadSprite("door_right", "sprites/tiles/door_right.png");
    await k.loadSprite("pavement", "sprites/tiles/pavement.png");
    await k.loadSprite("pavement_horiz", "sprites/tiles/pavement_horiz.png");
    await k.loadSprite("pavement_vert", "sprites/tiles/pavement_vert.png");
    await k.loadSprite("pavement_junction_up", "sprites/tiles/pavement_junction_up.png");
    await k.loadSprite("sidewalk", "sprites/tiles/sidewalk.png");
    await k.loadSprite("wall_stone", "sprites/tiles/wall_stone.png");
    await k.loadSprite("wood_floor", "sprites/tiles/wood_floor.png");
  },
  loadPlayers: async () => {
    await k.loadSprite("player_bad", "sprites/players/player_bad.png");
    await k.loadSprite("player_meh", "sprites/players/player_meh.png");
    await k.loadSprite("player_good", "sprites/players/player_good.png");
  },
  loadNPCs: async () => {
    await k.loadSprite("bouncer", "sprites/NPCs/bouncer.png");
  },
  loadObjects: async () => {
    await k.loadSpriteAtlas("sprites/objects/cars.png", {
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
