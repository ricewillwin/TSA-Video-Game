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
    await k.loadSprite("table", "./sprites/tiles/BilliardTable.png");
    await k.loadSprite("dancetable", "./sprites/tiles/tablegood.png");
    await k.loadSprite("chair_right", "./sprites/tiles/chairright.png");
    await k.loadSprite("chair_left", "./sprites/tiles/chair.png");
    await k.loadSprite("chair_auction", "./sprites/tiles/auctionchair.png");
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
    await k.loadSprite("billiardguy_redhair", "./sprites/NPCs/billiardguy1.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        idle: {
          from: 0,
          to: 1,
          loop: true
        }
      }
    });
    await k.loadSprite("billiardguy_brownhair", "./sprites/NPCs/billiardguy2.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        idle: {
          from: 0,
          to: 1,
          loop: true
        }
      }
    });
    await k.loadSprite("lighterguy", "./sprites/NPCs/billiardguy3.png", {
      sliceX: 15,
      sliceY: 1,
      anims: {
        idle: {
          from: 0,
          to: 14,
          loop: true
        }
      }
    });
    await k.loadSpriteAtlas("./sprites/NPCs/NPCs.png", {
      "tanshirt_blackpants": {
        "y": 0 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "brownshirt_tanpants": {
        "y": 1 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "brownshirt_greypants": {
        "y": 2 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "redshirt_blackpants": {
        "y": 3 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "greenshirt_blackpants": {
        "y": 4 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "blueshirt_tanpants": {
        "y": 5 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "whiteshirt_blackpants": {
        "y": 6 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "whitehair_reddress": {
        "y": 7 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "redhair_purpledress": {
        "y": 8 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "brownhair_bluedress": {
        "y": 9 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "blondehair_whitedress": {
        "y": 10 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "blueshirt_blackpants": {
        "y": 11 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
      "greenshirt_tanpants": {
        "y": 12 * 16,
        "x": 0,
        "width": 64,
        "height": 16,
        "sliceX": 4,
        "anims": {
          "idle": {
            "from": 0,
            "to": 3,
            "loop": true
          }
        }
      },
    });
    await k.loadSprite("dancers_purplegreen", "./sprites/NPCs/dancers1.png", {
      sliceX: 4,
      sliceY: 1,
      anims: {
        idle: {
          from: 0,
          to: 3,
          loop: true
        }
      }
    });
    await k.loadSprite("dancers_whitered", "./sprites/NPCs/dancers2.png", {
      sliceX: 4,
      sliceY: 1,
      anims: {
        idle: {
          from: 0,
          to: 3,
          loop: true
        }
      }
    });
    await k.loadSprite("auction_brownhair", "./sprites/NPCs/auctiongal1.png");
    await k.loadSprite("auction_blondehair", "./sprites/NPCs/auctiongal2.png");
    await k.loadSprite("auction_blackhair", "./sprites/NPCs/auctionguy1.png");
    await k.loadSprite("auction_redhair", "./sprites/NPCs/auctionguy2.png");
    await k.loadSprite("auctioneer", "./sprites/NPCs/auctiontalker.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        idle: {
          from: 0,
          to: 1,
          loop: true
        }
      }
    });
    await k.loadSprite("musician", "./sprites/NPCs/musician.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        idle: {
          from: 0,
          to: 1,
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
        "sliceY": 2,
      },
      "car_blue": {
        "x": 16,
        "y": 0,
        "width": 16,
        "height": 64,
        "sliceY": 2,
      },
      "car_yellow": {
        "x": 32,
        "y": 0,
        "width": 16,
        "height": 64,
        "sliceY": 2,
      },
      "car_green": {
        "x": 48,
        "y": 0,
        "width": 16,
        "height": 64,
        "sliceY": 2,
      },
      "car_striped": {
        "x": 64,
        "y": 0,
        "width": 16,
        "height": 64,
        "sliceY": 2,
      },
    });
  },
};
