"use strict";

var http = require("../misc/http");

exports.registerRoute = function (app, passport) {
    app.get("/api/oauth/google/callback", passport.authenticate("google", {
        successRedirect: "/api/user",
        failureRedirect: "/"
    }));

    app.get("/api/oauth/google", passport.authenticate("google", {scope: ["profile", "email"]}));

};


