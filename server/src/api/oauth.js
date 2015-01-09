"use strict";

var scopes = require("../auth/configurationCtrl").scopes;

exports.registerRoute = function (app, passport) {
    app.get("/api/oauth/google/callback", passport.authenticate("google", {
        successRedirect: "/redirect.html",
        failureRedirect: "/"
    }));
    
    app.get("/api/oauth/facebook/callback", passport.authenticate("facebook", {
        successRedirect: "/redirect.html",
        failureRedirect: "/"
    }));

    app.get("/api/oauth/google", passport.authenticate("google", scopes.google));

    app.get("/api/oauth/facebook", passport.authenticate("facebook", scopes.facebook));
};


