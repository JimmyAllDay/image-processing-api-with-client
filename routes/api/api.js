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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
//Express router
var routes = express_1["default"].Router();
// Node modules
var path = require("path");
var fs = require("fs");
// Custom modules import
var processImage = require("../../modules/sharpUtils");
var resize = processImage.resize;
// Error handling modules
var errorUtils = require("../../modules/errorUtils");
var checkQueryParams = errorUtils.checkQueryParams;
var checkImage = errorUtils.checkImage;
var checkSaveDir = errorUtils.checkSaveDir;
var checkInts = errorUtils.checkInts;
//Route
routes.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageName, widthString, heightString, width, height, dirPath, localImage, output, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imageName = req.query.name;
                widthString = req.query.width;
                heightString = req.query.height;
                width = Number(widthString);
                height = Number(heightString);
                dirPath = path.join(__dirname, "../../thumb");
                localImage = path.join(__dirname, "../../images", "".concat(imageName, ".jpg"));
                output = path.join(__dirname, "../../thumb", "".concat(imageName, "_").concat(width, "_").concat(height, ".jpg"));
                if (!fs.existsSync(output)) return [3 /*break*/, 1];
                res.sendFile(output);
                return [3 /*break*/, 5];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, resize(localImage, width, height, output, res)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.send("An error has occured while processing the requested image. Please try again with valid parameters. Error: ".concat(err_1));
                return [2 /*return*/];
            case 4:
                res.sendFile(output, function (err) {
                    if (err) {
                        res.send("An error has occured while transimitting the requested image. Please try again with valid parameters. Error: ".concat(err));
                        return;
                    }
                });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
exports["default"] = routes;
