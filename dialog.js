import { k } from "./kaboom.js"

export const createDialogText = (npc) => {
  npc.dialogObj = k.add([
    k.text(npc.dialog[npc.currentDialog]),
    k.scale(0.5),
    k.z(5),
    k.origin("center"),
    k.pos(npc.pos.add(8, -2)),
  ]);
};

export const nextDialog = (npc) => {
  npc.currentDialog = (npc.currentDialog + 1) % npc.dialog.length;
  npc.dialogObj.use(k.text(npc.dialog[npc.currentDialog]));
}