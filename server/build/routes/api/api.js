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
const routes = express_1.default.Router();
const app = (0, express_1.default)();
const path = require("path");
const fs = require("fs");
const processImage = require("../../modules/processImage");
const resize = processImage.resize;
const cleanUpImage = processImage.cleanUpImage;
routes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.query.name;
    const widthString = req.query.width;
    const heightString = req.query.height;
    const widthNum = Number(widthString);
    const heightNum = Number(heightString);
    // Get path to image in server folder
    const resizedImage = path.join(__dirname, "../../", `${image}_${widthNum}_${heightNum}.jpg`);
    // Get path to image in images folder
    const localImage = path.join(__dirname, "../../images", `${image}.jpg`);
    // Get path to image in thumb folder
    const thumbImage = path.join(__dirname, "../../thumb", `${image}_${widthNum}_${heightNum}.jpg`);
    if (fs.existsSync(thumbImage)) {
        res.sendFile(thumbImage);
    }
    else {
        try {
            yield resize(localImage, widthNum, heightNum, image);
            yield cleanUpImage(resizedImage, thumbImage);
        }
        catch (err) {
            console.log(err);
        }
        res.sendFile(thumbImage);
    }
}));
exports.default = routes;
