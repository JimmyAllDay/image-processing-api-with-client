import { existsSync, fstat } from "fs";

const sharpUtils = require("../../modules/sharpUtils");
const resize = sharpUtils.resize;
const Path = require("path");
const Fs = require("fs");

const { mockResponse } = require("mock-req-res");
const res = mockResponse;

describe("Process image module", () => {
  const name1 = "encenadaport";
  const name2 = "fjord";
  const input1 = Path.join(__dirname, "../../../images", `${name1}.jpg`);
  const input2 = Path.join(__dirname, "../../../images", `${name2}.jpg`);
  const width = 200;
  const height = 200;
  const output1 = Path.join(
    __dirname,
    "../../../thumb",
    `${name1}_${width}_${height}.jpg`
  );
  const output2 = Path.join(
    __dirname,
    "../../../thumb",
    `${name2}_${width}_${height}.jpg`
  );
  const outDir = Fs.existsSync(Path.join(__dirname, "../../../thumb"));

  // Remove test output
  function remOutput(output: string) {
    return Fs.unlink(output, (err: Error) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }

  it("ensures the output dir exists in the save location", () => {
    expect(outDir).toBeTruthy();
  });

  it("creates a new image", async () => {
    //call transform function
    await resize(input1, width, height, output1, res);
    //test resized image exists
    expect(output1).toBeTruthy();

    remOutput(output1);
  });

  it("creates correct image with alternate args", async () => {
    //call transform with alternate params
    await resize(input2, width, height, output2, res);
    //test resized image exists
    expect(output2).toBeTruthy();

    remOutput(output2);
  });

  it("throws error with invalid args", () => {
    const heightString = "200";
    expect(
      async () =>
        await resize(input2, width, heightString, output2, res).then(() =>
          Promise.reject(
            new Error(
              "Expected positive integer for height but received 200 of type string"
            )
          )
        )
    );
  });
});
