"use strict";

var TripModel = require("./model");
var Promise = require("promise");
var dbProvider = require("./dao");
var TPError = require("../model/promiseError");
var Mediator = require("../core/mediator");
var tripDayCtrl = require("../tripday/controller");

var tripCtrl = {
    getEditorsId: function (id) {
        return dbProvider.getEditorsId(id);
    },
    edit: function (trip, userId) {
        return new Promise(function (resolve, reject) {
            if (!TripModel.isValid(trip)) {
                reject(new TPError(TPError.BadRequest, "Received object is not valid"));
            } else {
                tripCtrl.getEditorsId(trip.id)
                        .then(function (editors) {
                            if (editors.indexOf(userId) < 0) {
                                reject(new TPError(TPError.Unauthorized, "You are not allowed to edit this trip"));
                            } else {
                                return dbProvider.edit(trip);
                            }
                        })
                        .then(function (updatedTrip) {
                            Mediator.emit("tripUpdated", updatedTrip);
                            resolve(updatedTrip);
                        }, reject);
            }
        });
    },
    get: function (id) {
        return new Promise(function (resolve, reject) {
            if (id === null || typeof id === "undefined") {
                reject(new TPError(TPError.BadRequest, "Invalid trip ID"));
            } else {
                var result = null;
                dbProvider.get(id)
                        .then(function (trip) {
                            result = trip;
                            return tripDayCtrl.getDaysForTrip(id);
                        })
                        .then(function (days) {
                            result.days = days;
                            resolve(result);
                        });
            }
        });
    },
    create: function (trip, userId) {
        return new Promise(function (resolve, reject) {
            if (!TripModel.isValid(trip)) {
                reject(new TPError(TPError.BadRequest, "Received object is not valid"));
            } else {
                var _t = new TripModel();
                _t.convert(trip);
                _t.owner = userId;
                var result = null;
                dbProvider.create(_t)
                        .then(function (t) {
                            result = t;
                            t.days = [];
                            t.days.push(tripDayCtrl.getEmptyDay(t));
                            return tripDayCtrl.create(t.days[0]);
                        })
                        .then(resolve, reject);
            }
        });
    },
    getAuthorId: function (id) {
        return dbProvider.getAuthorId(id);
    },
    remove: function (id, userId) {
        return new Promise(function (resolve, reject) {
            tripCtrl.getAuthorId(id)
                    .then(function (result) {
                        if (result === userId) {
                            return dbProvider.remove(id);
                        } else {
                            reject(new TPError(TPError.Unauthorized, "You are not author of this trip"));
                        }
                    })
                    .then(function () {
                        Mediator.emit("tripRemoved", id);
                        resolve();
                    }, reject);
        });
    },
    getTripsForUser: function (userId) {
        return dbProvider.getUsersTrips(userId);
    }
};


exports.create = tripCtrl.create;
exports.remove = tripCtrl.remove;
exports.edit = tripCtrl.edit;
exports.get = tripCtrl.get;
exports.getAuthorId = tripCtrl.getAuthorId;
exports.getEditorsId = tripCtrl.getEditorsId;
exports.getTripsForUser = tripCtrl.getTripsForUser;