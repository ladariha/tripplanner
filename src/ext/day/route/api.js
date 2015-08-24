"use strict";

var http = require("../../../misc/http");
var ctrl = require("./controller");
exports.registerRoute = function (app) {

    app.post("/api/ext/day/route", function (req, res) {

        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to create a route");
        } else {

            ctrl.create(req.body, req.user.id).then(function (route) {
                http.Ok(res, route);
            }, function (err) {
                http[err.type](res, err.msg);
            });
        }
    });

    app.put("/api/ext/day/route/:id/:dayId", function (req, res) {

        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to edit a route");
        } else {
            ctrl.editExt(req.body, req.user.id).then(function (route) {
                http.Ok(res, route);
            }, function (err) {
                http.respond(err.type, err.msg, res);
            });
        }
    });

    app.get("/api/ext/day/route/:id/:dayId", function (req, res) {

        ctrl.getExt(req.params.id, req.params.dayId).then(function (route) {
            http.Ok(res, ctrl.toClient(route));
        }, function (err) {
            http.respond(err.type, err.msg, res);
        });
    });

    app.delete("/api/ext/day/route/:id/:dayId", function (req, res) {
        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to remove a route");
        } else {
            ctrl.removeExt(req.params.id, req.params.dayId, req.user.id).then(function (route) {
                http.Ok(res, route);
            }, function (err) {
                http.respond(err.type, err.msg, res);
            });
        }
    });
};


