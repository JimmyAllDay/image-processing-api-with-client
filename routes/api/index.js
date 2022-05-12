"use strict";
exports.__esModule = true;
var express_1 = require("express");
//Express router
var routes = express_1["default"].Router();
var errorUtils = require("../../modules/errorUtils");
var errorInfo = errorUtils.errorInfo;
routes.get("*", function (req, res) {
    res.send("The requested route does not exists on this server <br><br> ".concat(errorInfo));
});
exports["default"] = routes;
