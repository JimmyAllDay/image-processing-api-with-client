import express from "express";
const routes = express.Router();

import { Request, Response } from "express";
const app = express();

const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

app.use(express.json());

const processImage = require("../../modules/processImage");
const resize = processImage.resize;

const multer = require("multer");

// Create multer object
const imageUpload = multer({
  dest: "./images",
});

routes.post("/", imageUpload.single("file"), (req: Request, res: Response) => {
  //save incoming image to images folder
  console.log(req.file);
  res.json("post request recieved from client");
});

export default routes;
