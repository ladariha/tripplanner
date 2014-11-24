"use strict";

var auth = require("../auth/AuthorizationCtrl");
var http = require("../misc/http");

exports.registerRoute = function (app) {
    app.get("/api/session/logout", function (req, res) {
        auth.logout();
        http.AuthenticationTimeout(res, "User logged out");
    });
};


