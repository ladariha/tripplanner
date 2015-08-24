"use strict";

var auth = require("../auth/authorizationCtrl");
var http = require("../misc/http");
var userCtrl = require("../user/controller");

exports.registerRoute = function (app) {
    app.delete("/api/session", function (req, res) {
        auth.logout(req);
        http.NoContent(res);
    });

    app.get("/api/session", function (req, res) {
        if (req.user) {
            userCtrl.get(req.user._id, true).then(function (user) {
                if (user === null) {
                    http.NotFound(res, "Requested user not found");
                } else {
                    http.Ok(res, user);
                }
            }, function (err) {
                http[err.type](res, err.msg);
            });
        } else {
            http.Unauthorized(res, "No user is logged in");
        }
    });
};


