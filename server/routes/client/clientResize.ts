import express from "express";
const routes = express.Router();

import { Request, Response } from "express";
const app = express();

const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const resize = require("../../modules/resize");

routes.post("/client", (req: Request, res: Response) => {
  res.send("post request recieved from client");
});

export default routes;
