"use strict";

var tripCtrl = require("../trip/TripCtrl");
var http = require("../misc/http");

exports.registerRoute = function (app) {
    app.get("/api/trip", function (req, res) {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({}));
        res.end();
    });


    app.post("/api/trip", function (req, res) {

        tripCtrl.create(req.body).then(function (trip) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            res.write(JSON.stringify(trip));
            res.end();
        }, function (err) {
            http[err.type](res, err.msg);
        });
    });
};


