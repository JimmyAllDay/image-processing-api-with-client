const sharp = require("sharp");
const path = require("path");

//TODO:refactor the below into one 'resize function' - requires looking at route logic
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

//Resize via Client Route ("/sendImage")
async function resizeClient(
  image: string,
  width: number,
  height: number,
  output: string
) {
  //Resize file using sharp
  await sharp(image)
    .resize({
      width: width,
      height: height,
    })
    .toFile(output)
    .catch((err: Error) => {
      console.log(err);
    });
}

module.exports = {
  resize: resize,
  resizeClient: resizeClient,
};
