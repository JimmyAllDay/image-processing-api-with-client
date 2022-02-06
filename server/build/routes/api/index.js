"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Express router
const routes = express_1.default.Router();
const errorUtils = require("../../modules/errorUtils");
const errorInfo = errorUtils.errorInfo;
routes.get("*", function (req, res) {
    res.send(`The requested route does not exists on this server <br><br> ${errorInfo}`);
});
exports.default = routes;
