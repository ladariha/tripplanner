"use strict";

var http = require("../misc/http");

exports.registerRoute = function (app) {
    app.get("/api/user", function (req, res) {
        http.Ok(res, req.user);
    });
};
