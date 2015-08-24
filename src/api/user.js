"use strict";

var http = require("../misc/http");
var userCtrl = require("../user/controller");
exports.registerRoute = function (app) {
    app.get("/api/user", function (req, res) {
        http.Ok(res, req.user);
    });

    app.get("/api/user/:userId", function (req, res) {
        userCtrl.get(req.params.userId, true).then(function (user) {
            if (user === null) {
                http.NotFound(res, "Requested user not found");
            } else {
                http.Ok(res, user);
            }
        }, function (err) {
            http[err.type](res, err.msg);
        });
    });
};
