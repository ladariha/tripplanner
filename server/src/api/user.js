"use strict";

var http = require("../misc/http");
var UserCtrl = require("../user/userCtrl");
exports.registerRoute = function (app) {
    app.get("/api/user", function (req, res) {
        console.log(2);
        http.Ok(res, req.user);
    });

    app.get("/api/user/:userId", function (req, res) {
        UserCtrl.get(req.params.userId).then(function (user) {
            if (user === null) {
                http.NotFound(res, "Requested user not found");
            } else {
                http.Ok(res, user.toClient());
            }
        }, function (err) {
            http[err.type](res, err.msg);
        });
    });
};
