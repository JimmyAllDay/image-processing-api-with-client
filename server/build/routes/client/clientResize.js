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
const app = (0, express_1.default)();
const multer_1 = __importDefault(require("multer"));
const routes = express_1.default.Router();
const cors = require("cors");
app.use(cors);
//Node modules
const path = require("path");
const fs = require("fs").promises;
// Import Sharp utilities modules
const processImage = require("../../modules/sharpUtils");
const resize = processImage.resize;
//Import Multer utilities modules
const multerUtils = require("../../modules/multerUtils");
const fileStorage = multerUtils.fileStorage;
const getFileType = multerUtils.getFileType;
const getNameNoExt = multerUtils.getNameNoExt;
// Create multer object
const upload = (0, multer_1.default)({
    storage: fileStorage,
});
//TODO: Error handling has not been addressed for the below
routes.post("/", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const heightString = req.body.height;
    const widthString = req.body.width;
    const height = Number(heightString);
    const width = Number(widthString);
    const name = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
    const imagePath = path.join(__dirname, "../../clientResize", `${name}`);
    const nameNoExt = getNameNoExt((_b = req.file) === null || _b === void 0 ? void 0 : _b.originalname);
    const format = getFileType(name);
    const output = path.join(__dirname, "../../clientResize", `${nameNoExt}_${heightString}_${widthString}${format}`);
    yield resize(imagePath, width, height, output, res);
    res.sendFile(output, (err) => {
        if (err) {
            res.send(err.message);
            return;
        }
        else {
            try {
                fs.unlink(output);
                fs.unlink(imagePath);
            }
            catch (err) {
                throw new Error();
            }
        }
    });
}));
exports.default = routes;
