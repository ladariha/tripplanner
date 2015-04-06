"use strict";

var http = require("../../../misc/http");
var ctrl = require("./controller");
exports.registerRoute = function (app) {

    app.post("/api/ext/day/note", function (req, res) {

        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to create a note");
        } else {

            ctrl.create(req.body, req.user.id).then(function (note) {// TODO the create must returns resolved extension so that client will just add it to list of extensions instead of fetching entire trip again 
                http.Ok(res, "Created");
            }, function (err) {
                http[err.type](res, err.msg);
            });
        }
    });
};


