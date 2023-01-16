import { COMMANDS } from "./constants";
import {
  circleHandler,
  moveDownHandler,
  moveLeftHandler,
  moveRightHandler,
  moveUpHandler,
  postionHandler,
  printScreenHandler,
  rectangleHandler,
  squareHandler,
} from "./handlers";
import { getCMD } from "./helpers";

export const proceedData = async (data: Buffer) => {
  const cmd = getCMD(data);
  const message = data.toString();
  switch (cmd) {
    case COMMANDS.mouse_left: {
      moveLeftHandler(message);
      return message;
    }
    case COMMANDS.mouse_right: {
      moveRightHandler(message);
      return message;
    }
    case COMMANDS.mouse_up: {
      moveUpHandler(message);
      return message;
    }
    case COMMANDS.mouse_down: {
      moveDownHandler(message);
      return message;
    }
    case COMMANDS.mouse_position: {
      const [x, y] = await postionHandler(message);
      return `${cmd} ${x}px,${y}px`;
    }
    case COMMANDS.draw_square: {
      squareHandler(message);
      return message;
    }
    case COMMANDS.draw_rectangle: {
      rectangleHandler(message);
      return message;
    }
    case COMMANDS.draw_circle: {
      circleHandler(message);
      return message;
    }
    case COMMANDS.prnt_scrn: {
      const buffer = await printScreenHandler(message);
      return `${message} ${buffer}`;
    }
    default:
      console.log("error");
  }
};