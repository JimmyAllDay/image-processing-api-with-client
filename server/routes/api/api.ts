import express from "express";

//Express router
const routes = express.Router();

//Express / typescript types
import { Request, Response } from "express";

// Node modules
const path = require("path");
const fs = require("fs");

// Custom modules import
const processImage = require("../../modules/sharpUtils");
const resize = processImage.resize;
// Error handling modules
const errorUtils = require("../../modules/errorUtils");
const checkQueryParams = errorUtils.checkQueryParams;
const checkImage = errorUtils.checkImage;
const checkSaveDir = errorUtils.checkSaveDir;
const checkInts = errorUtils.checkInts;

//Route
routes.get("/", async (req: Request, res: Response) => {
  // check query params
  await checkQueryParams(req.query, res);

  // Set query params as string
  const imageName = req.query.name;
  //Check that image exists
  await checkImage(imageName, res);

  const widthString = req.query.width;
  const heightString = req.query.height;

  // convert string dimensions to ints
  const width = Number(widthString);
  const height = Number(heightString);

  // Check converted dimensions
  await checkInts(width, height, res);

  //Check that save directory exists
  const dirPath = path.join(__dirname, "../../thumb");
  await checkSaveDir(dirPath);

  // Get path to image in images folder
  const localImage = path.join(__dirname, "../../images", `${imageName}.jpg`);

  // Get path to image in thumb folder
  const output = path.join(
    __dirname,
    "../../thumb",
    `${imageName}_${width}_${height}.jpg`
  );

  if (fs.existsSync(output)) {
    res.sendFile(output);
  } else {
    try {
      await resize(localImage, width, height, output, res);
    } catch (err) {
      res.send(
        `An error has occured while processing the requested image. Please try again with valid parameters. Error: ${err}`
      );
      return;
    }
    res.sendFile(output, (err) => {
      if (err) {
        res.send(
          `An error has occured while transimitting the requested image. Please try again with valid parameters. Error: ${err}`
        );
        return;
      }
    });
  }
});

export default routes;
