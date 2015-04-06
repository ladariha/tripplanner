"use strict";

require("../ext/tripDayExtModel");
var http = require("../misc/http");
/**
 * 
 * @type TripCtrl
 */
var tripDayCtrl = require("../tripday/controller");

exports.registerRoute = function (app) {

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
        if (!req.user) {//!req.user
            http.Unauthorized(res, "You need to be logged in to remove trip day");
        } else {
            tripDayCtrl.create(req.body).then(function () {
                http.Ok(res, "Day created");
            }, function (err) {
                http.respond(err.type, err.msg, res);
            });
        }
    });
    
    app.put("/api/tripDay/:id", function (req, res) {
        if (!req.user) {//!req.user
            http.Unauthorized(res, "You need to be logged in to edit trip day");
        } else {
            tripDayCtrl.update(req.body, req.user.id).then(function () {
                http.Ok(res, "Day created");
            }, function (err) {
                http.respond(err.type, err.msg, res);
            });
        }
    });

    app.get("/api/tripDay/:id", function (req, res) {
        tripDayCtrl.get(req.params.id).then(function (tripDay) {
            http.Ok(res, tripDay.toClient());
        }, function (err) {
            http.respond(err.type, err.msg, res);
        });
    });



};


