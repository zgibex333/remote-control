export const getCMD = (msg) => msg.toString().split(" ")[0];
export const singleDemensionPixels = (msg) =>
  Number(msg.toString().split(" ")[1]);
export const doubleDimensions = (msg) => {
  const words = msg.toString().split(" ");
  return [Number(words[1]), Number(words[2])];
};
