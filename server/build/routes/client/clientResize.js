"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
const app = (0, express_1.default)();
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
app.use(express_1.default.json());
const processImage = require("../../modules/processImage");
const resize = processImage.resize;
const multer = require("multer");
// Create multer object
const imageUpload = multer({
    dest: "./images",
});
routes.post("/", imageUpload.single("file"), (req, res) => {
    //save incoming image to images folder
    console.log(req.file);
    res.json("post request recieved from client");
});
exports.default = routes;
