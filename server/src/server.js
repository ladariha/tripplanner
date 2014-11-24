"use strict";
var express = require("express");
var fs = require("fs");
var path = require("path");
var utils = require("./misc/util");
var db = require("./core/db");
var bodyParser = require("body-parser");
var app = express();
var server = null;
var applicationCore = {};
var tripPlanner = require("./core/tripPlanner");
var authorization = require("./auth/ConfigurationCtrl");


function loadConfig(filename) {
    try {
        return JSON.parse(fs.readFileSync(filename).toString());
    } catch (err) {
        throw new Error("There has been an error parsing your JSON Configuration (" + filename + ") - " + err.toString());
    }
}

(function start() {

    console.log("loading configuration...");
    var config = loadConfig(path.join(__dirname, "config.json")) || {};

    console.log("loading sources...");
    applicationCore.tripPlanner = tripPlanner;
    // connect to DB & setup models
    db.init(config.database.host, config.database.port, config.database.databaseName);

    // CORS
    app.all("*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, X-TripPlanner-SessionId, X-TripPlanner-Created, X-TripPlanner-UserId, Content-Type");
        next();
    });

    // login
    var pass = authorization.configure(app);

    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    console.log("loading routing handlers...");
    var routes = utils.listFiles((path.join(path.dirname(__filename), config.server.paths.api)).toString());
    // load all routers
    routes.forEach(function (route) {
        require(route).registerRoute(app, pass);
    });


    applicationCore.ext = {
        trip: {},
        tripDay: {}
    };

    console.log("loading trip extensions...");
    var tripExts = utils.listFoldersAndNames((path.join(path.dirname(__filename), config.server.paths.tripExtensions)).toString());
    var _e;
    for (var i in tripExts) {
        if (tripExts.hasOwnProperty(i)) {
            _e = require(tripExts[i] + "/src.js");
            if (applicationCore.tripPlanner.isExtensionValid(_e)) {
                applicationCore.ext.trip[i] = _e;
            }
        }
    }

    console.log("loading trip day extensions...");
    var tripDayExts = utils.listFoldersAndNames((path.join(path.dirname(__filename), config.server.paths.tripDayExtensions)).toString());

    for (var i in tripDayExts) {
        if (tripDayExts.hasOwnProperty(i)) {
            _e = require(tripDayExts[i] + "/src.js");
            if (applicationCore.tripPlanner.isExtensionValid(_e)) {
                applicationCore.ext.tripDay[i] = _e;
            }
        }
    }

    server = app.listen(config.server.port, function () {
        console.log("Listening on port %d", server.address().port);
    });
})();

module.exports = applicationCore;