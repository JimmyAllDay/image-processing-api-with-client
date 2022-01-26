const sharp = require("sharp");
const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");

async function resize(
  image: string,
  width: number,
  height: number,
  name: string
) {
  //Resize file using sharp
  await sharp(image)
    .resize({
      width: width,
      height: height,
    })
    .toFile(path.join(__dirname, `../thumb/${name}_${width}_${height}.jpg`))
    .catch((err: Error) => {
      console.log(err);
    });
}

module.exports = { resize: resize };
