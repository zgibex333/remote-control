import { doubleDimensions, singleDemensionPixels } from "./helpers.js";
import {
  mouse,
  left,
  right,
  up,
  down,
  Point,
  straightTo,
  centerOf,
  Region,
  Button,
  screen,
} from "@nut-tree/nut-js";
import Jimp from "jimp";

mouse.config = { mouseSpeed: 500, autoDelayMs: 0 };

export const moveLeftHandler = (message: string) => {
  const px = singleDemensionPixels(message);
  (async () => {
    try {
      await mouse.move(left(px));
    } catch {
      console.log(`Error ${message}`);
    }
  })();
};
export const moveRightHandler = (message: string) => {
  const px = singleDemensionPixels(message);
  (async () => {
    try {
      await mouse.move(right(px));
    } catch {
      console.log(`Error ${message}`);
    }
  })();
};
export const moveUpHandler = (message: string) => {
  const px = singleDemensionPixels(message);
  (async () => {
    try {
      await mouse.move(up(px));
    } catch {
      console.log(`Error ${message}`);
    }
  })();
};
export const moveDownHandler = (message: string) => {
  const px = singleDemensionPixels(message);
  (async () => {
    try {
      await mouse.move(down(px));
    } catch {
      console.log(`Error ${message}`);
    }
  })();
};
export const postionHandler = async (message: string) => {
  try {
    const { x, y } = await mouse.getPosition();
    return [x, y];
  } catch {
    console.log(`Error ${message}`);
    return ["Error X", "Error Y"];
  }
};
export const squareHandler = (message: string) => {
  const px = singleDemensionPixels(message);
  (async () => {
    try {
      await mouse.pressButton(Button.LEFT);
      await mouse.move(right(px));
      await mouse.move(down(px));
      await mouse.move(left(px));
      await mouse.move(up(px));
      await mouse.releaseButton(Button.LEFT);
    } catch {
      console.log(`Error ${message}`);
    }
  })();
};
export const rectangleHandler = (message: string) => {
  const [width, height] = doubleDimensions(message);
  (async () => {
    try {
      await mouse.pressButton(Button.LEFT);
      await mouse.move(right(width));
      await mouse.move(down(height));
      await mouse.move(left(width));
      await mouse.move(up(height));
      await mouse.releaseButton(Button.LEFT);
    } catch {
      console.log(`Error ${message}`);
    }
  })();
};
export const circleHandler = (message: string) => {
  const radius = singleDemensionPixels(message);

  (async () => {
    try {
      mouse.config = { mouseSpeed: 250, autoDelayMs: 0 };
      const { x: centerX, y: currentY } = await mouse.getPosition();
      const centerY = Math.floor(currentY + radius / 2);
      let i = 0;
      const point = new Point(
        centerX + radius * Math.cos(i),
        centerY + radius * Math.sin(i)
      );
      await mouse.move(straightTo(point));
      await mouse.pressButton(Button.LEFT);
      while (i !== 6.35) {
        const point = new Point(
          centerX + radius * Math.cos(i),
          centerY + radius * Math.sin(i)
        );
        await mouse.move(straightTo(point));
        i = Number(i.toFixed(2)) + Number((0.05).toFixed(2));
        i = Number(i.toFixed(2));
      }
      await mouse.releaseButton(Button.LEFT);
      mouse.config = { mouseSpeed: 500, autoDelayMs: 0 };
    } catch {
      console.log(`Error ${message}`);
    }
  })();
};
export const printScreenHandler = async (message: string) => {
  try {
    const { x: currentX, y: currentY } = await mouse.getPosition();
    const region = new Region(currentX - 100, currentY - 100, 200, 200);
    const screenHeight = await screen.height();
    const screenWidth = await screen.width();
    if (region.left < 0) region.left = 0;
    if (region.top < 0) region.top = 0;
    if (region.top + 200 > screenHeight) region.top = screenHeight - 200;
    if (region.left + 200 > screenWidth) region.left = screenWidth - 200;
    const screenShot = await screen
      .grabRegion(region)
      .then((img) => img.toRGB());

    let jimpImg = new Jimp({
      data: screenShot.data,
      width: screenShot.width,
      height: screenShot.height,
    });
    const img200x200 = jimpImg.resize(200, 200);
    const base64 = await img200x200.getBase64Async(Jimp.MIME_PNG);
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches) {
      return matches[2];
    } else {
      throw new Error("Error");
    }
  } catch {
    console.log(`Error ${message}`);
    return "Error";
  }
};
