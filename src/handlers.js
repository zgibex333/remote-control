import {
  mouse,
  left,
  right,
  up,
  down,
  MouseClass,
  Point,
  straightTo,
  centerOf,
  Region,
  Button,
} from "@nut-tree/nut-js";
import { doubleDimensions, singleDemensionPixels } from "./helpers.js";

mouse.config = { mouseSpeed: 500 };

export const moveLeftHandler = (message) => {
  const px = singleDemensionPixels(message);
  (async () => {
    await mouse.move(left(px));
  })();
};
export const moveRightHandler = (message) => {
  const px = singleDemensionPixels(message);
  (async () => {
    await mouse.move(right(px));
  })();
};
export const moveUpHandler = (message) => {
  const px = singleDemensionPixels(message);
  (async () => {
    await mouse.move(up(px));
  })();
};
export const moveDownHandler = (message) => {
  const px = singleDemensionPixels(message);
  (async () => {
    await mouse.move(down(px));
  })();
};
export const postionHandler = async (message) => {
  const { x, y } = await mouse.getPosition();
  return [x, y];
};
export const squareHandler = (message) => {
  const px = singleDemensionPixels(message);
  (async () => {
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(px));
    await mouse.move(down(px));
    await mouse.move(left(px));
    await mouse.move(up(px));
    await mouse.releaseButton(Button.LEFT);
  })();
};
export const rectangleHandler = (message) => {
  const [width, height] = doubleDimensions(message);
  (async () => {
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(width));
    await mouse.move(down(height));
    await mouse.move(left(width));
    await mouse.move(up(height));
    await mouse.releaseButton(Button.LEFT);
  })();
};
export const circleHandler = (message) => {};
export const printScreenHandler = (message) => {};
