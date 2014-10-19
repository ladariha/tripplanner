"use strict";

var mongoose = require("mongoose");
//var utils = require("../misc/util.js");
//var path = require("path");


exports.init = function (host, port, database) {
    mongoose.connect(host + ":" + port + "/" + database);
    return;
//    // load models and init them
//    var fileModels = utils.listFilesAndNames((path.join(path.dirname(__filename), "../model/")));
//    var anyModel;
//
//    for (var model in fileModels) {
//        if (fileModels.hasOwnProperty(model)) {
//            anyModel = require(fileModels[model]);
//            if (anyModel.hasOwnProperty("defineSchema")) { // it is really DB related model
//                models[model] = anyModel.defineSchema();
//            }
//        }
//    }

};