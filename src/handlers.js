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
  screen,
} from "@nut-tree/nut-js";
import { doubleDimensions, singleDemensionPixels } from "./helpers.js";
import Jimp from "jimp";

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
export const printScreenHandler = async (message) => {
  const { x: currentX, y: currentY } = await mouse.getPosition();
  const region = new Region(currentX - 100, currentY - 100, 200, 200);
  const screenHeight = await screen.height();
  const screenWidth = await screen.width();
  if (region.left < 0) region.left = 0;
  if (region.top < 0) region.top = 0;
  if (region.top + 200 > screenHeight) region.top = screenHeight - 200;
  if (region.left + 200 > screenWidth) region.left = screenWidth - 200;
  const screenShot = await screen.grabRegion(region);

  let jimpImg = new Jimp({
    data: screenShot.data,
    width: screenShot.width,
    height: screenShot.height,
  });
  const img200x200 = jimpImg.resize(200, 200);
  const base64 = await img200x200.getBase64Async(Jimp.MIME_PNG);
  const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  return matches[2];
};
