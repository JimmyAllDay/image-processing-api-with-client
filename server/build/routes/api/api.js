"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Express router
const routes = express_1.default.Router();
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
routes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check query params
        yield checkQueryParams(req.query, res);
    }
    catch (err) {
        res.send(`An error has occured: ${err.message}`);
    }
    // Set query params as string
    const imageName = req.query.name;
    //Check that image exists
    try {
        // check query params
        yield checkImage(imageName, res);
    }
    catch (err) {
        res.send(`An error has occured: ${err.message}`);
    }
    const widthString = req.query.width;
    const heightString = req.query.height;
    // convert string dimensions to ints
    const width = Number(widthString);
    const height = Number(heightString);
    try {
        // Check converted dimensions
        yield checkInts(width, height, res);
    }
    catch (err) {
        res.send(`An error has occured: ${err.message}`);
    }
    // Save directory path
    const dirPath = path.join(__dirname, "../../thumb");
    //Check that save directory exists
    try {
        // Check converted dimensions
        yield checkSaveDir(dirPath);
    }
    catch (err) {
        res.send(`An error has occured: ${err.message}`);
    }
    // Get path to image in images folder
    const localImage = path.join(__dirname, "../../images", `${imageName}.jpg`);
    // Get path to image in thumb folder
    const output = path.join(__dirname, "../../thumb", `${imageName}_${width}_${height}.jpg`);
    if (fs.existsSync(output)) {
        res.sendFile(output);
    }
    else {
        try {
            yield resize(localImage, width, height, output, res);
        }
        catch (err) {
            res.send(`An error has occured while processing the requested image. Please try again with valid parameters. Error: ${err}`);
        }
        res.sendFile(output, (err) => {
            if (err) {
                res.send(`An error has occured while transimitting the requested image. Please try again with valid parameters. Error: ${err}`);
            }
        });
    }
}));
exports.default = routes;
