"use strict";
exports.__esModule = true;
//Server
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
//Middleware
var cors = require("cors");
var morgan = require("morgan");
//Routes
var api_1 = require("./routes/api/api");
var clientResize_1 = require("./routes/client/clientResize");
var index_1 = require("./routes/api/index");
var path_1 = require("path");
var client = path_1["default"].join(__dirname, "/client/build");
app.use(express.static(client));
//Initialise middleware
app.use(cors(), morgan("dev"));
//API
app.use("/api", api_1["default"]);
// Return image to client
app.use("/sendImage", clientResize_1["default"]);
// Serve client
app.get("/", function (req, res) {
    res.sendFile(client, "index.html");
});
//Global route matcher
app.use("*", index_1["default"]);
// Log server listening
app.listen(port, function () {
    // eslint-disable-next-line no-console
    console.log("Server listening on port ".concat(port, "..."));
});
exports["default"] = app;
