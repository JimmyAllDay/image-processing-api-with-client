const sharpUtils = require("../../modules/sharpUtils");
const Resize = sharpUtils.resize;
const Path = require("path");
const Fs = require("fs");

//TODO: You may need to use supertest to test the below

describe("Process image module", () => {
  const name1 = "encenadaport";
  const name2 = "fjord";
  const input1 = Path.join(__dirname, "../../../images", `${name1}.jpg`);
  const input2 = Path.join(__dirname, "../../../images", `${name2}.jpg`);
  const width = 200;
  const height = 200;
  const output1 = Fs.existsSync(
    Path.join(__dirname, "../../../", `${name1}_${width}_${height}.jpg`)
  );
  const output2 = Fs.existsSync(
    Path.join(__dirname, "../../../", `${name2}_${width}_${height}.jpg`)
  );

  it("creates a new image", async () => {
    //call resize function
    await Resize(input1, width, height, output1, res);
    //test resized image exists
    expect(output1).toBeTruthy();
  });

  it("creates correct image with alternate params", async () => {
    //call resize function
    await Resize(input2, width, height, output2, res);
    //test resized image exists
    expect(output1).toBeTruthy();
  });
});
