import express from "express";
const routes = express.Router();

import { Request, Response } from "express";
const app = express();

const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const resize = require("../../modules/resize");

routes.get("/", async (req: Request, res: Response) => {
  const image = req.query.name;
  const widthString = req.query.width;
  const heightString = req.query.height;
  const widthNum = Number(widthString);
  const heightNum = Number(heightString);

  // Get path to requested image in client
  const localImage = path.join(__dirname, "../../images", `${image}.jpg`);
  // get path to rquested image in thumb folder
  const newImage = path.join(
    __dirname,
    "../../thumb",
    `${image}_${widthNum}_${heightNum}.jpg`
  );

  // path to image in server folder
  const resizedImage = path.join(
    __dirname,
    "../../",
    `${image}_${widthNum}_${heightNum}.jpg`
  );

  if (fs.existsSync(newImage)) {
    console.log(`Image exists, sending: ${newImage}`);
    res.sendFile(newImage);
  } else {
    console.log(`Image created, sending: ${newImage}`);
    try {
      await resize(localImage, widthNum, heightNum, image);
      await fsPromises
        .copyFile(resizedImage, newImage)
        .then(function () {
          fs.unlink(resizedImage, (err: any) => {
            if (err) {
              console.log(err);
              return;
            } else {
              console.log(`deleted file: ${resizedImage}`);
            }
          });
        })
        .catch(function (error: any) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
    res.sendFile(newImage);
  }
});

export default routes;
