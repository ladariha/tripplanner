"use strict";

var ctrl = require("../ext/tripday/controller");
var http = require("../misc/http");

exports.registerRoute = function (app) {
    
    app.get("/api/ext/tripday", function (req, res) {
        http.Ok(res,  ctrl.getExtensions());
    });

   
};


