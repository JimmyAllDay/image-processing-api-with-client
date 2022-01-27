import express from "express";
const app = express();
import { Request, Response } from "express";

const routes = express.Router();
const cors = require("cors");
app.use(cors);

//Node modules
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

// Import modules
const processImage = require("../../modules/processImage");
const resize = processImage.resize;

//Multer package to store files
const multer = require("multer");

// Create multer object
const upload = multer({
  dest: "images/",
});

routes.post("/", upload.single("file"), (req: Request, res: Response) => {
  console.log(req);
  //save incoming image to images folder

  // resize();

  res.json("POST request recieved from client");
});

export default routes;
