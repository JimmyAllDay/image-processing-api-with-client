"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    it("creates a new image", () => __awaiter(void 0, void 0, void 0, function* () {
        //call resize function
        yield Resize(input, width, height, name);
        const output = Fs.existsSync(Path.join(__dirname, "../../../thumb", `${name}_${width}_${height}.jpg`));
        //test resized image exists
        expect(output).toBeTruthy();
    }));
    xit("relocates image to thumbs folder", () => __awaiter(void 0, void 0, void 0, function* () {
        //find image outputted from Resize()
        const resized = Path.join(__dirname, "../../../", `${name}_${width}_${height}.jpg`);
        //find dest to relocate image
        const relocate = Path.join(__dirname, "../../../thumb", `${name}_${width}_${height}.jpg`);
        //move resized image to thumbs folder
        yield CleanUpImage(resized, relocate);
        const output = Fs.existsSync(Path.join(__dirname, "../../../thumb", `${name}_${width}_${height}.jpg`));
        //test resized image exists
        expect(output).toBeTruthy();
        //clean up resized image
        Fs.unlink(relocate, (err) => {
            if (err) {
                console.log("test unlink failed:", err);
                return;
            }
            else {
                console.log("test file deleted");
                return;
            }
        });
    }));
    it("deletes image from server root after moving", () => { });
});
