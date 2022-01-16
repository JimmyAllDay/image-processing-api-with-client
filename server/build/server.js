"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api_1 = __importDefault(require("./routes/api/api"));
const clientResize_1 = __importDefault(require("./routes/client/clientResize"));
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 5000;
app.use(cors(), morgan("combined"));
// write tests for code
// split functions into different modules
// POST resized images to client
// create functionality uploading images from front end, and resizing them
//API
app.use("/image", api_1.default);
// Client
app.use("/client", clientResize_1.default);
// Log server listening
app.listen(port, () => {
    console.log(`Example app listening on port ${port}...`);
});
