import express from "express";
const app = express();

//Express router
const routes = express.Router();

//Express / typescript types
import { Request, Response } from "express";

// Node modules
const path = require("path");
const fs = require("fs");

//Express validator
const { check, query } = require("express-validator");

// Custom modules import
const processImage = require("../../modules/sharpUtils");
const resize = processImage.resize;

//Route
routes.get("/", async (req: Request, res: Response) => {
  const image = req.query.name;
  const widthString = req.query.width;
  const heightString = req.query.height;
  const widthNum = Number(widthString);
  const heightNum = Number(heightString);

  // Get path to image in images folder
  const localImage = path.join(__dirname, "../../images", `${image}.jpg`);

  // Get path to image in thumb folder
  const thumbImage = path.join(
    __dirname,
    "../../thumb",
    `${image}_${widthNum}_${heightNum}.jpg`
  );

  if (fs.existsSync(thumbImage)) {
    res.sendFile(thumbImage);
  } else {
    try {
      await resize(localImage, widthNum, heightNum, image);
    } catch (err) {
      console.log(err);
      return;
    }
    res.sendFile(thumbImage);
  }
});

export default routes;
