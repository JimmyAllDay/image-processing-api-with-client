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
const sharp = require("sharp");
const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");
function resize(image, width, height, name) {
    return __awaiter(this, void 0, void 0, function* () {
        //Resize file using sharp
        yield sharp(image)
            .resize({
            width: width,
            height: height,
        })
            .toFile(path.join(__dirname, `../thumb/${name}_${width}_${height}.jpg`));
    });
}
function cleanUpImage(resizedPath, thumbPath) {
    return __awaiter(this, void 0, void 0, function* () {
        //Relocate file after resize
        yield fsPromises
            .copyFile(resizedPath, thumbPath)
            // Delete file in root directory
            .then(fs.unlink(resizedPath, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        }));
    });
}
module.exports = { resize: resize, cleanUpImage: cleanUpImage };
console.log(path.join(__dirname, "../thumb"));
