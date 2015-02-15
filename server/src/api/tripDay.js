"use strict";

var application = require("../server");
require("../ext/tripDayExtModel");
var http = require("../misc/http");
/**
 * 
 * @type TripCtrl
 */
var tripDayCtrl = require("../tripday/controller");

exports.registerRoute = function (app) {
    app.get("/api/tripDay", function (req, res) {

        tripDayCtrl.create({}, function (err, data) {
            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                res.write(JSON.stringify(err));
                res.end();
            } else {

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                res.write(JSON.stringify(application.controllers));
                res.end();
            }
        });



    });

    app.delete("/api/tripDay/:id/:tripId", function (req, res) {
        if (!req.user) {//!req.user
            http.Unauthorized(res, "You need to be logged in to remove trip day");
        } else {
            tripDayCtrl.remove(req.params.id, req.params.tripId, req.user.id).then(function () {
                http.Ok(res, "Day removed");
            }, function (err) {
                http[err.type](res, err.msg);
            });
        }
    });


    app.post("/api/tripDay", function (req, res) {

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.write("2");
        res.end();
    });



};


