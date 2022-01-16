const sharp = require("sharp");

module.exports = async function resize(
  path: string,
  width: number,
  height: number,
  name: string
) {
  return await sharp(path)
    .resize({
      width: width,
      height: height,
    })
    .toFile(`${name}_${width}_${height}.jpg`);
};
