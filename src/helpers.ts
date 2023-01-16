export const getCMD = (msg: Buffer) => msg.toString().split(" ")[0];
export const singleDemensionPixels = (msg: string) =>
  Number(msg.toString().split(" ")[1]);
export const doubleDimensions = (msg: string) => {
  const words = msg.toString().split(" ");
  return [Number(words[1]), Number(words[2])];
};
