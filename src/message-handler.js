import { COMMANDS } from "./constants.js";
import { getCMD } from "./helpers.js";

export const messageHandler = (msg) => {
  console.log(msg);
  //   const CMD = getCMD(msg);
  //   switch (CMD) {
  //     case COMMANDS.mouse_up:
  //       console.log("up");
  //     case COMMANDS.mouse_down:
  //       console.log("down");
  //     case COMMANDS.mouse_left:
  //       console.log("left");
  //     case COMMANDS.mouse_right:
  //       console.log("right");
  //     default:
  //       console.log("default");
  //   }
};
