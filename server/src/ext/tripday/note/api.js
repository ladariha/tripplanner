"use strict";

var http = require("../../../misc/http");
var ctrl = require("./controller");
exports.registerRoute = function (app) {

    app.post("/api/ext/day/note", function (req, res) {

        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to create a note");
        } else {

            ctrl.create(req.body).then(function (note) {
                http.Ok(res, note.toClient());
            }, function (err) {
                http[err.type](res, err.msg);
            });
        }



    });


};


