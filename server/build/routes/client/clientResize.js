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
const resize = require("../../modules/resize");
routes.post("/client", (req, res) => {
    res.send("post request recieved from client");
});
exports.default = routes;
