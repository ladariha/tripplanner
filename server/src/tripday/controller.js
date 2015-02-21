"use strict";
var TripDayModel = require("./model");
var tripCtrl = require("../trip/controller");
var TPError = require("../model/promiseError");
var Promise = require("promise");
var dbProvider = require("./dao");

var tripDayCtrl = {
    get: function (id) {
        return dbProvider.get(id);
    },
    update: function (tripDay, userId) {
        return new Promise(function (resolve, reject) {
            if (!TripDayModel.isValid(tripDay)) {
                reject(new TPError(TPError.BadRequest, "Received object is not valid"));
            } else {
                tripDayCtrl.getTripId(tripDay.id)
                        .then(function (tripId) {
                            return tripCtrl.getEditorsId(tripId);
                        })
                        .then(function (editors) {
                            if (editors.indexOf(userId) < 0) {
                                reject(new TPError(TPError.Unauthorized, "You are not allowed to edit this trip"));
                            } else {
                                return dbProvider.edit(tripDay);
                            }
                        })
                        .then(function (uptatedTripDay) {
                            resolve(uptatedTripDay);
                        }, function (err) {
                            reject(err);
                        });
            }
        });
    },
    getTripId: function (tripDayId) {
        return dbProvider.getTripId(tripDayId);
    },
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
            var _t = new TripDayModel();
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
            tripCtrl.getEditorsId(tripId)
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
exports.get = tripDayCtrl.get;
exports.update = tripDayCtrl.update;