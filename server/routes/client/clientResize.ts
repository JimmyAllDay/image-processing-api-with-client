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
const resize = processImage.resize;

//Import Multer utilities modules
const multerUtils = require("../../modules/multerUtils");
const fileStorage = multerUtils.fileStorage;
const getFileType = multerUtils.getFileType;
const getNameNoExt = multerUtils.getNameNoExt;

// Create multer object
const upload = multer({
  storage: fileStorage,
});
//TODO: Error handling has not been addressed for the below
routes.post("/", upload.single("file"), async (req: Request, res: Response) => {
  const heightString = req.body.height;
  const widthString = req.body.width;
  const height = Number(heightString);
  const width = Number(widthString);
  
  // Maximum dimension limit to prevent resource exhaustion
  const MAX_DIMENSION = 3000;
  
  if (!width || !height || isNaN(width) || isNaN(height)) {
    res.status(400).send('Width and height must be valid numbers');
    return;
  }

  if (width < 1 || height < 1) {
    res.status(400).send('Width and height must be at least 1 pixel');
    return;
  }

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    res.status(400).send(`Width and height must not exceed ${MAX_DIMENSION} pixels`);
    return;
  }

  const name = req.file?.originalname;
  const serverRoot = process.cwd();
  const imagePath = path.join(serverRoot, "clientResize", `${name}`);
  const nameNoExt = getNameNoExt(req.file?.originalname);
  const format = getFileType(name);
  const output = path.join(
    serverRoot,
    "clientResize",
    `${nameNoExt}_${heightString}_${widthString}${format}`
  );
  await resize(imagePath, width, height, output, res);
  res.sendFile(output, (err: Error) => {
    if (err) {
      res.send(err.message);
      return;
    } else {
      try {
        fs.unlink(output);
        fs.unlink(imagePath);
      } catch (err) {
        throw new Error();
      }
    }
  });
});

export default routes;
