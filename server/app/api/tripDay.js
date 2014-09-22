"use strict";

var application = require("../server");

/**
 * 
 * @type TripCtrl
 */
var tripCtrl = require("../trip/TripCtrl");

exports.registerRoute = function(app) {
    app.get("/api/tripDay", function(req, res) {

        tripCtrl.create({}, function(err, data) {
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


    app.post("/api/tripDay", function(req, res) {
       
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.write("2");
        res.end();
    });



};


