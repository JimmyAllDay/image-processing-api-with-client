const processImage = require("../../modules/processImage");
const Resize = processImage.resize;
const CleanUpImage = processImage.cleanUpImage;
const Path = require("path");
const Fs = require("fs");

describe("Process image module", () => {
  const input = Path.join(__dirname, "../../../images", "encenadaport.jpg");
  const width = 200;
  const height = 200;
  const name = "encenadaport";

  it("creates a new image", async () => {
    //call resize function
    await Resize(input, width, height, name);

    const output = Fs.existsSync(
      Path.join(__dirname, "../../../", `${name}_${width}_${height}.jpg`)
    );
    //test resized image exists
    expect(output).toBeTruthy();
  });
});
