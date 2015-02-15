"use strict";
var TripDayModel = require("./model");
var trrr = require("../trip/controller");
var TPError = require("../model/promiseError");
var Promise = require("promise");
var dbProvider = require("./dao");

var tripDayCtrl = {
    getEmptyDay: function (trip) {
        var td = new TripDayModel();
        td.date = trip.date;
        td.tripId = trip._id;
        td.name = "Day 1";
        td.description = "";
        return td;
    },
    getDaysForTrip: function (tripId) {
        return dbProvider.getDaysForTrip(tripId);
    },
    create: function (tripDay) {
        if (!(tripDay instanceof TripDayModel)) {
            var _t = new TripModel();
            _t.convert(tripDay);
            tripDay = _t;
        }
        return new Promise(function (resolve, reject) {
            if (!TripDayModel.isValid(tripDay)) {
                reject(new TPError(TPError.BadRequest, "Received object is not valid"));
            } else {
                resolve(dbProvider.create(tripDay));
            }
        });
    },
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


exports.getEmptyDay = tripDayCtrl.getEmptyDay;
exports.getDaysForTrip = tripDayCtrl.getDaysForTrip;
exports.create = tripDayCtrl.create;
exports.remove = tripDayCtrl.remove;