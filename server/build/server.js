"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Server
const express = require("express");
const app = express();
const port = 5000;
//Middleware
const cors = require("cors");
const morgan = require("morgan");
//Routes
const api_1 = __importDefault(require("./routes/api/api"));
const clientResize_1 = __importDefault(require("./routes/client/clientResize"));
//Iniitate middleware
app.use(cors(), morgan("dev"));
//API
app.use("/api", api_1.default);
// Client
app.use("/sendImage", clientResize_1.default);
// Log server listening
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
exports.default = app;
