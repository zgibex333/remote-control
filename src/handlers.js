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
  screen
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
export const circleHandler = (message) => {
  const radius = singleDemensionPixels(message);
  (async () => {
    const { x: centerX, y: currentY } = await mouse.getPosition();
    const centerY = Math.floor(currentY + radius / 2);
    let i = 0;
    const point = new Point(
      centerX + radius * Math.cos(i),
      centerY + radius * Math.sin(i)
    );
    await mouse.move(straightTo(point));
    await mouse.pressButton(Button.LEFT);
    while (i !== (6.35).toFixed(2)) {
      const point = new Point(
        centerX + radius * Math.cos(i),
        centerY + radius * Math.sin(i)
      );
      await mouse.move(straightTo(point));
      i = parseFloat(i) + parseFloat(0.05);
      i = i.toFixed(2);
    }
    await mouse.releaseButton(Button.LEFT);
  })();
};
export const printScreenHandler = (message) => {
  screen.capture()
};
