"use strict";

var scopes = require("../auth/configurationCtrl").scopes;
var redirects = require("../auth/configurationCtrl").redirects;
exports.registerRoute = function (app, passport) {
    app.get("/api/oauth/google/callback", passport.authenticate("google", redirects));
    
    app.get("/api/oauth/facebook/callback", passport.authenticate("facebook", redirects));

    app.get("/api/oauth/google", passport.authenticate("google", scopes.google));

    app.get("/api/oauth/facebook", passport.authenticate("facebook", scopes.facebook));
};


