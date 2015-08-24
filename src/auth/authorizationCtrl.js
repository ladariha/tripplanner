"use strict";

var http = require("../misc/http");

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    http.Unauthorized(res, "You need to login");
};

exports.logout = function (req) {
    req.logout();
};