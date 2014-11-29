"use strict";

var auth = require("../auth/AuthorizationCtrl");
var http = require("../misc/http");

exports.registerRoute = function (app) {
    app.delete("/api/session", function (req, res) {
        auth.logout(req);
        http.NoContent(res);
    });
    
    app.get("/api/session", function(req, res){
        if(req.user){
            http.Ok(res, req.user.toClient()); 
        }else{
            http.Unauthorized(res, "No user is logged in");
        }
    });
};


