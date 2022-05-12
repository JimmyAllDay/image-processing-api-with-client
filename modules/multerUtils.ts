const multer = require("multer");
import { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

//Set Multer save location
const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "clientResize/");
  },
  //Set Multer save file name
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, file.originalname);
  },
});

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

function getFileType(name: string) {
  const nameArr = name.split("");
  const stopIndex = nameArr.indexOf(".");
  const fileChars = nameArr.slice(stopIndex);
  const fileType = fileChars.join("");
  return fileType;
}
function getNameNoExt(name: string) {
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
