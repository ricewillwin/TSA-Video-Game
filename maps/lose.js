import { k } from "./../kaboom.js";
import { loadLevel1 } from "./level1.js";

export var loaded = false;

export const loadLose = () => k.scene("lose", async () => {
  loaded = true;

  await k.choose([type1, type2, type3, type4])();

  k.wait(1, () => {
    k.go("menu");
  });
});

const type1 = async () => {
  let you = k.add([
    k.text("YOU"),
    k.scale(8),
    k.origin("center"),
    k.pos(k.width()/2, k.height()/8),
    k.layer("ui"),
  ]);
  let were = k.add([
    k.text("WERE"),
    k.scale(8),
    k.origin("center"),
    k.pos(k.width()/2, 3*k.height()/8),
    k.layer("ui"),
  ]);
  let found = k.add([
    k.text("FOUND"),
    k.scale(8),
    k.origin("center"),
    k.pos(k.width()/2, 5*k.height()/8),
    k.layer("ui"),
  ]);
  let out = k.add([
    k.text("OUT"),
    k.scale(8),
    k.origin("center"),
    k.pos(k.width()/2, 7*k.height()/8),
    k.layer("ui"),
  ]);
  you.hidden = true;
  were.hidden = true;
  found.hidden = true;
  out.hidden = true;

  await k.wait(0.75, () => {
    you.hidden = false;
    k.shake(5);
  });
  await k.wait(0.75, () => {
    were.hidden = false;
    k.shake(5);
  });
  await k.wait(0.75, () => {
    found.hidden = false;
    k.shake(5);
  });
  await k.wait(0.75, () => {
    out.hidden = false;
    k.shake(15);
  });
}

const type2 = async () => {
  let you = k.add([
    k.text("YOU"),
    k.scale(8),
    k.origin("topleft"),
    k.pos(5, 5),
    k.layer("ui"),
  ]);
  let were = k.add([
    k.text("WERE"),
    k.scale(8),
    k.origin("topright"),
    k.pos(k.width() - 5, 5),
    k.layer("ui"),
  ]);
  let found = k.add([
    k.text("FOUND"),
    k.scale(8),
    k.origin("botleft"),
    k.pos(5, k.height() - 5),
    k.layer("ui"),
  ]);
  let out = k.add([
    k.text("OUT"),
    k.scale(8),
    k.origin("botright"),
    k.pos(k.width() - 5, k.height() - 5),
    k.layer("ui"),
  ]);
  you.hidden = true;
  were.hidden = true;
  found.hidden = true;
  out.hidden = true;

  await k.wait(0.75, () => {
    you.hidden = false;
    k.shake(5);
  });
  await k.wait(0.75, () => {
    were.hidden = false;
    k.shake(5);
  });
  await k.wait(0.75, () => {
    found.hidden = false;
    k.shake(5);
  });
  await k.wait(0.75, () => {
    out.hidden = false;
    k.shake(15);
  });
}

const type3 = async () => {
  let text = k.add([
    k.scale(12),
    k.origin("center"),
    k.pos(k.width() / 2, k.height() / 2),
    k.layer("ui"),
  ]);

  await k.wait(0.75, () => {
    text.use(k.text("YOU"));
    k.shake(5);
  });
  await k.wait(0.75, () => {
    text.use(k.text("WERE"));
    k.shake(5);
  });
  await k.wait(0.75, () => {
    text.use(k.text("FOUND"));
    k.shake(5);
  });
  await k.wait(0.75, () => {
    text.use(k.text("OUT"));
    k.shake(15);
  });
}

const type4 = async () => {
  let you = k.add([
    k.text("YOU"),
    k.scale(8),
    k.origin("center"),
    k.pos(k.width()/8, k.height()/8),
    k.layer("ui"),
  ]);
  let were = k.add([
    k.text("WERE"),
    k.scale(8),
    k.origin("center"),
    k.pos(3*k.width()/8, 3*k.height()/8),
    k.layer("ui"),
  ]);
  let found = k.add([
    k.text("FOUND"),
    k.scale(8),
    k.origin("center"),
    k.pos(5*k.width()/8, 5*k.height()/8),
    k.layer("ui"),
  ]);
  let out = k.add([
    k.text("OUT"),
    k.scale(8),
    k.origin("center"),
    k.pos(7*k.width()/8, 7*k.height()/8),
    k.layer("ui"),
  ]);
  you.hidden = true;
  were.hidden = true;
  found.hidden = true;
  out.hidden = true;

  await k.wait(0.75, () => {
    you.hidden = false;
    k.shake(5);
  });
  await k.wait(0.75, () => {
    were.hidden = false;
    k.shake(5);
  });
  await k.wait(0.75, () => {
    found.hidden = false;
    k.shake(5);
  });
  await k.wait(0.75, () => {
    out.hidden = false;
    k.shake(15);
  });
}
