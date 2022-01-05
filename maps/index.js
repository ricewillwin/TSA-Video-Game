import { k } from "./../kaboom.js";

export class GameMap {
  #mapArray;
  #spawn;
  #map;

  constructor(mapArray) {
    this.#mapArray = mapArray.map;
    this.#spawn = mapArray.spawn;
    this.#map = k.addLevel(mapArray.map, mapArray.legend);
    for (const obj in mapArray.objs) {
      for (const newPos in obj.pos) {
        this.addSprite(obj.comps, ...obj.pos);
      }
    }
  }

  addSprite(spriteComps, ...pos) {
    k.add([
      k.pos(this.getWorldPos(...pos)),
      ...spriteComps,
    ]);
  }

  get spawn() {
    return [...this.#spawn];
  }

  getWorldPos(...args) {
    return this.#map.getPos(...args);
  }

  getMapPos(...args) {
    const p = k.vec2(...args);
    const offset = this.#map.offset();
    return k.vec2((p.x - offset.x) / this.#map.gridWidth(), (p.y - offset.y) / this.#map.gridHeight());
  }
}
