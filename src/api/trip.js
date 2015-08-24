"use strict";

var tripCtrl = require("../trip/controller");
var http = require("../misc/http");

exports.registerRoute = function (app) {
    app.get("/api/trip/:id", function (req, res) {
        tripCtrl.get(req.params.id).then(function (trip) {
            http.Ok(res, trip.toClient());
        }, function (err) {
            http[err.type](res, err.msg);
        });
    });

    app.post("/api/trip", function (req, res) {
        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to create trip");
        } else {
            tripCtrl.create(req.body, req.user.id).then(function (trip) {
                http.Ok(res, trip.toClient());
            }, function (err) {
                http[err.type](res, err.msg);
            });
        }
    });

    app.put("/api/trip/:id", function (req, res) {
        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to update trip");
        } else {
            tripCtrl.edit(req.body, req.user.id).then(function (trip) {
                http.Ok(res, trip.toClient());
            }, function (err) {
                http[err.type](res, err.msg);
            });
        }
    });

    app.delete("/api/trip/:id", function (req, res) {
        if (!req.user) {
            http.Unauthorized(res, "You need to be logged in to remove trip");
        } else {
            tripCtrl.remove(req.params.id, req.user.id).then(function () {
                http.Ok(res, "Trip removed");
            }, function (err) {
                http[err.type](res, err.msg);
            });
        }
    });
};


