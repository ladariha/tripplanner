"use strict";

var http = require("../../../misc/http");
var ctrl = require("./controller");
exports.registerRoute = function (app) {

    app.post("/api/ext/day/note", function (req, res) {

        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to create a note");
        } else {

            ctrl.create(req.body, req.user.id).then(function (note) {
                http.Ok(res, note);
            }, function (err) {
                http[err.type](res, err.msg);
            });
        }
    });

    app.put("/api/ext/day/note/:id/:dayId", function (req, res) {

        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to edit a note");
        } else {
            ctrl.editExt(req.body, req.user.id).then(function (note) {
                http.Ok(res, note);
            }, function (err) {
                http.respond(err.type, err.msg, res);
            });
        }
    });

    app.get("/api/ext/day/note/:id/:dayId", function (req, res) {

        ctrl.getExt(req.params.id, req.params.dayId).then(function (note) {
            http.Ok(res, ctrl.toClient(note));
        }, function (err) {
            http.respond(err.type, err.msg, res);
        });
    });

    app.delete("/api/ext/day/note/:id/:dayId", function (req, res) {
        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to remove a note");
        } else {
            ctrl.removeExt(req.params.id, req.params.dayId, req.user.id).then(function (note) {
                http.Ok(res, note);
            }, function (err) {
                http.respond(err.type, err.msg, res);
            });
        }
    });
};


