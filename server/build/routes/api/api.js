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
    // check query params
    yield checkQueryParams(req.query, res);
    // Set query params as string
    const imageName = req.query.name;
    //Check that image exists
    yield checkImage(imageName, res);
    const widthString = req.query.width;
    const heightString = req.query.height;
    // convert string dimensions to ints
    const width = Number(widthString);
    const height = Number(heightString);
    // Check converted dimensions
    yield checkInts(width, height, res);
    //Check that save directory exists
    const dirPath = path.join(__dirname, "../../thumb");
    yield checkSaveDir(dirPath);
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
            return;
        }
        res.sendFile(output, (err) => {
            if (err) {
                res.send(`An error has occured while transimitting the requested image. Please try again with valid parameters. Error: ${err}`);
                return;
            }
        });
    }
}));
exports.default = routes;
