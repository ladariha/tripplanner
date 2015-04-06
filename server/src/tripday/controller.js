"use strict";
var Promise = require("promise");
var TripDayModel = require("./model");
var TPError = require("../model/promiseError");
var dbProvider = require("./dao");
var extensionCtrl = require("../ext/day/controller");

function TripDayCtrl() {}

TripDayCtrl.prototype.get = function (id) {
    return dbProvider.get(id);
};
TripDayCtrl.prototype.update = function (tripDay, userId) {
    var self = this;
    return new Promise(function (resolve, reject) {
        if (!TripDayModel.isValid(tripDay)) {
            reject(new TPError(TPError.BadRequest, "Received object is not valid"));
        } else {
            self.getTripId(tripDay.id)
                    .then(dbProvider.getEditorsId)
                    .then(function (editors) {
                        if (editors.indexOf(userId) < 0) {
                            reject(new TPError(TPError.Unauthorized, "You are not allowed to edit this trip"));
                        } else {
                            return dbProvider.edit(tripDay);
                        }
                    })
                    .then(resolve, reject);
        }
    });
};
TripDayCtrl.prototype.getTripId = function (tripDayId) {
    return dbProvider.getTripId(tripDayId);
};
TripDayCtrl.prototype.getEmptyDay = function (trip) {
    var td = new TripDayModel();
    td.date = trip.date;
    td.tripId = trip._id;
    td.name = "Day 1";
    td.description = "";
    return td;
};
TripDayCtrl.prototype.getDaysForTrip = function (tripId) {
    return dbProvider.getDaysForTrip(tripId).then(extensionCtrl.get);
};
TripDayCtrl.prototype.create = function (tripDay) {
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
};
TripDayCtrl.prototype.remove = function (id, tripId, userId) {

    return new Promise(function (resolve, reject) {
        dbProvider.getEditorsId(tripId)
                .then(function (editors) {
                    if (editors.indexOf(userId) < 0) {
                        reject(new TPError(TPError.Unauthorized, "You are not allowed to remove this day"));
                    } else {
                        resolve(dbProvider.remove(id));
                    }
                });
    });
};


module.exports = new TripDayCtrl();