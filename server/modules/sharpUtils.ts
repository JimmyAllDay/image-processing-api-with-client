const sharp = require("sharp");
import { Response } from "express";

async function resize(
  image: string,
  width: number,
  height: number,
  output: string,
  res: Response
) {
  //Resize file using sharp
  await sharp(image)
    .resize({
      width: width,
      height: height,
    })
    .toFile(output)
    .catch((err: Error) => {
      res.send(err.message);
      throw new Error();
    });
}

const imageNameArray = [
  "encenadaport",
  "fjord",
  "icelandwaterfall",
  "palmtunnel",
  "santamonica",
];

module.exports = {
  resize: resize,
  imageNameArray: imageNameArray,
};
