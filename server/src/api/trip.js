"use strict";

var tripCtrl = require("../trip/TripCtrl");
var http = require("../misc/http");

exports.registerRoute = function (app) {
    app.get("/api/trip", function (req, res) {
        tripCtrl.get(req.query.id).then(function (trip) {
            http.Ok(res, trip.toClient());
        }, function (err) {
            http[err.type](res, err.msg);
        });
    });

    app.post("/api/trip", function (req, res) {

        tripCtrl.create(req.body).then(function (trip) {
            http.Ok(res, trip.toClient());
        }, function (err) {
            http[err.type](res, err.msg);
        });
    });
};


