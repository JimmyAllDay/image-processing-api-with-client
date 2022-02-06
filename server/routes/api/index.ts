import express from "express";

//Express router
const routes = express.Router();

//Express / typescript types
import { Request, Response } from "express";

const errorUtils = require("../../modules/errorUtils");
const errorInfo = errorUtils.errorInfo;

routes.get("*", function (req: Request, res: Response) {
  res.send(
    `The requested route does not exists on this server <br><br> ${errorInfo}`
  );
});

export default routes;
