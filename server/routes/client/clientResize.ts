import express from "express";
const app = express();
import { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";

const routes = express.Router();
const cors = require("cors");
app.use(cors);

//Node modules
const path = require("path");
const fs = require("fs").promises;

// Import Sharp utilities modules
const processImage = require("../../modules/sharpUtils");
const resizeClient = processImage.resizeClient;

//Import Multer utilities modules
const multerUtils = require("../../modules/multerUtils");
const fileStorage = multerUtils.fileStorage;
const getFileType = multerUtils.getFileType;
const getNameNoExt = multerUtils.getNameNoExt;

// Create multer object
const upload = multer({
  storage: fileStorage,
});

routes.post("/", upload.single("file"), async (req: Request, res: Response) => {
  const heightString = req.body.height;
  const widthString = req.body.width;
  const height = Number(heightString);
  const width = Number(widthString);
  const name = req.file?.originalname;
  const imagePath = path.join(__dirname, "../../clientResize", `${name}`);
  const nameNoExt = getNameNoExt(req.file?.originalname);
  const format = getFileType(name);
  const output = path.join(
    __dirname,
    "../../clientResize",
    `${nameNoExt}_${heightString}_${widthString}${format}`
  );
  await resizeClient(imagePath, width, height, output);
  res.sendFile(output, (err: Error) => {
    if (err) {
      console.log(err);
      return;
    } else {
      try {
        fs.unlink(output);
        fs.unlink(imagePath);
      } catch (err) {
        console.log(err);
      }
    }
  });
});

export default routes;
