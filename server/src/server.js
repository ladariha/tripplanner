"use strict";

var fs = require("fs");
var path = require("path");

var express = require("express");
var bodyParser = require("body-parser");

var utils = require("./misc/util");
var db = require("./core/db");
var tripPlanner = require("./core/tripPlanner");
var authorization = require("./auth/configurationCtrl");
var extensionsCtrls = {
    tripDay: require("./ext/day/controller"),
    trip: require("./ext/trip/controller")
};

var app = express();
var server = null;
var applicationCore = {};


function loadConfig(filename) {
    try {
        return JSON.parse(fs.readFileSync(filename).toString());
    } catch (err) {
        throw new Error("There has been an error parsing your JSON Configuration (" + filename + ") - " + err.toString());
    }
}

function loadExtensions(folder, extensionType, pass) {
    var exts = utils.listFoldersAndNames((path.join(path.dirname(__filename), folder)).toString());
    var _e;
    for (var i in exts) {
        if (exts.hasOwnProperty(i)) {
            _e = require(exts[i] + "/controller.js");
            if (applicationCore.tripPlanner.isExtensionValid(_e)) {
                extensionsCtrls[extensionType].registerExtension(i);
                require(exts[i] + "/client.json"); // just to make sure such configuration exists for each extension
                require(exts[i] + "/api.js").registerRoute(app, pass);
            }
        }
    }
}

function loadRouting(folder, pass) {
    var routes = utils.listFiles((path.join(path.dirname(__filename), folder)).toString());
    // load all routers
    routes.forEach(function (route) {
        require(route).registerRoute(app, pass);
    });
}

(function start() {

    console.log("loading configuration...");
    var config = loadConfig(path.join(__dirname, "config.json"));

    console.log("loading sources...");
    applicationCore.tripPlanner = tripPlanner;
    // connect to DB & setup models
    db.init(config.database.host, config.database.port, config.database.databaseName);

    // CORS
    app.all("*", authorization.addCorsHeaders);

    // login
    var pass = authorization.configure(app);

    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    console.log("loading routing handlers...");
    loadRouting(config.server.paths.api, pass);

    console.log("registering static files");
    app.use(express.static(path.join(__dirname, config.server.paths.static)));

    applicationCore.ext = {
        trip: {},
        tripDay: {}
    };

//    console.log("loading trip extensions...");
//    loadExtensions(config.server.paths.tripExtensions, "trip");

    console.log("loading trip day extensions...");
    loadExtensions(config.server.paths.tripDayExtensions, "tripDay", pass);

    require("./core/loader");

    server = app.listen(config.server.port, function () {
        console.log("Listening on port %d", server.address().port);
    });
})();

module.exports = applicationCore;
