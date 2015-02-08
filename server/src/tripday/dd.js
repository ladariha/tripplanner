"use strict";
var TripDayModel = require("./model");
var trrr = require("../trip/controller");
var TPError = require("../model/promiseError");
var Promise = require("promise");
var dbProvider = require("./dao");

var TripDayCtrl = {
    remove: function (id, tripId, userId) {

        return new Promise(function (resolve, reject) {
            trrr.getEditorsId(tripId)
                    .then(function (editors) {
                        if (editors.indexOf(userId) < 0) {
                            reject(new TPError(TPError.Unauthorized, "You are not allowed to remove this day"));
                        } else {
                            resolve(dbProvider.remove(id));
                        }
                    });
        });
    }


};


module.exports = TripDayCtrl;