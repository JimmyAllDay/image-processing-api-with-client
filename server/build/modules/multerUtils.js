"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
//Set Multer save location
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "clientResize/");
    },
    //Set Multer save file name
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const fileFilter = (request, file, callback) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
function getFileType(name) {
    const nameArr = name.split("");
    const stopIndex = nameArr.indexOf(".");
    const fileChars = nameArr.slice(stopIndex);
    const fileType = fileChars.join("");
    return fileType;
}
function getNameNoExt(name) {
    const nameArr = name.split("");
    const stopIndex = nameArr.indexOf(".");
    const fileChars = nameArr.slice(0, stopIndex);
    const fileName = fileChars.join("");
    return fileName;
}
module.exports = {
    fileStorage: fileStorage,
    fileFiler: fileFilter,
    getFileType: getFileType,
    getNameNoExt: getNameNoExt,
};
