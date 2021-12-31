import { k } from "./kaboom.js";

const buttonPadding = 50;

/**Creates a button with given parameters.
 *
 * It is recommended to use the following syntax: const { textObj, buttonObj } = addButton(...);
 * @param {string} text text to display on button
 * @param {number} x x-coordinate of the button center
 * @param {number} y y-coordinate of the button center
 * @param {number} scale scale value for both objects
 * @param {[number, number, number]} textColor array of RGB values (0-255) of text color
 * @param {[number, number, number]} buttonColor array of RGB values (0-255) of button color
 * @param {*[]} textComps additional components to add to text object
 * @param {*[]} buttonComps additional components to add to button object
 * @param {number} padding padding of button around text; defaults to {@link buttonPadding}
 * @returns {[Object,Object]} an array containing the text object and the button object respectively
 */
export const addButton = (text, x, y, scale, textColor, buttonColor, textComps, buttonComps, padding = buttonPadding) => {
  let textObj = k.add([
    k.layer("ui"),
    k.text(text),
    k.z(1),
    k.scale(scale),
    k.color(...textColor),
    k.origin("center"),
    k.pos(x, y),
    ...textComps,
  ]);

  const buttonObj = k.add([
    k.rect(textObj.width + padding, textObj.height + padding),
    k.layer("ui"),
    k.scale(scale),
    k.color(...buttonColor),
    k.origin("center"),
    k.area(),
    k.pos(x, y),
    ...buttonComps,
  ]);

  return [textObj, buttonObj];
};
