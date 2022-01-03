import { k } from "../kaboom.js"

export const legend = {
  "bouncer": (ctx) => ([
    k.sprite("bouncer"),
    k.layer("game"),
    k.area(),
    k.solid(),
    k.z(1),
  ]),
  "outer wall": (ctx) => ([
    k.sprite("wall_outer"),
    k.layer("game"),
    k.area(),
    k.solid(),
  ]),
  "left door": (ctx) => ([
    k.sprite("door_left"),
    k.layer("game"),
    k.area(),
    k.solid(),
  ]),
  "right door": (ctx) => ([
    k.sprite("door_right"),
    k.layer("game"),
    k.area(),
    k.solid(),
  ]),
  "sidewalk": (ctx) => ([
    k.sprite("sidewalk"),
    k.layer("floor"),
  ]),
  "pavement": (ctx) => ([
    k.sprite("pavement"),
    k.layer("floor"),
  ]),
  "pavement with vertical line": (ctx) => ([
    k.sprite("pavement_vert"),
    k.layer("floor"),
  ]),
  "pavement with horizontal line": (ctx) => ([
    k.sprite("pavement_horiz"),
    k.layer("floor"),
  ]),
  "pavement with junction up": (ctx) => ([
    k.sprite("pavement_junction"),
    k.layer("floor"),
  ]),
};
