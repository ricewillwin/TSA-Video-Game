import { k } from "./kaboom.js"

export const spriteLoader = {
  loadStructure: () => {
    k.loadSprite("door_left", "sprites/tiles/door_left.png");
    k.loadSprite("door_right", "sprites/tiles/door_right.png");
    k.loadSprite("pavement", "sprites/tiles/pavement.png");
    k.loadSprite("pavement_horiz", "sprites/tiles/pavement_horiz.png");
    k.loadSprite("pavement_vert", "sprites/tiles/pavement_vert.png");
    k.loadSprite("pavement_junction", "sprites/tiles/pavement_junction.png");
    k.loadSprite("sidewalk", "sprites/tiles/sidewalk.png");
    k.loadSprite("wall_outer", "sprites/tiles/wall_outer.png");
    k.loadSprite("wood_floor", "sprites/tiles/wood_floor.png");
  },
  loadPlayers: () => {
    k.loadSprite("player_bad", "sprites/players/player_1.png");
    k.loadSprite("player_meh", "sprites/players/player_2.png");
    k.loadSprite("player_good", "sprites/players/player_3.png");
  },
  loadNPCs: () => {
    k.loadSprite("bouncer", "sprites/NPCs/bouncer.png");
  },
  loadObjects: () => {
    k.loadSpriteAtlas("sprites/objects/cars.png", {
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
