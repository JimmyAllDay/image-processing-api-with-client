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

  xit("relocates image to thumbs folder", async () => {
    //find image outputted from Resize()
    const resized = Path.join(
      __dirname,
      "../../../",
      `${name}_${width}_${height}.jpg`
    );

    //find dest to relocate image
    const relocate = Path.join(
      __dirname,
      "../../../thumb",
      `${name}_${width}_${height}.jpg`
    );

    //move resized image to thumbs folder
    await CleanUpImage(resized, relocate);

    const output = Fs.existsSync(
      Path.join(__dirname, "../../../thumb", `${name}_${width}_${height}.jpg`)
    );
    //test resized image exists
    expect(output).toBeTruthy();
    //clean up resized image
    Fs.unlink(relocate, (err: Error) => {
      if (err) {
        console.log("test unlink failed:", err);
        return;
      } else {
        console.log("test file deleted");
        return;
      }
    });
  });

  it("deletes image from server root after moving", () => {});
});
