"use strict";

var TripModel = require("./tripModel");
var Promise = require("promise");
var dbProvider = require("./tripDao");
var TPError = require("../model/promiseError");
var Mediator = require("../core/mediator");



var TripCtrl = {
    getEditorsId: function (id) {
        return dbProvider.getEditorsId(id);
    },
    edit: function (trip, userId) {
        return new Promise(function (resolve, reject) {
            if (!TripModel.isValid(trip)) {
                reject(new TPError(TPError.BadRequest, "Received object is not valid"));
            } else {
                TripCtrl.getEditorsId(trip.id)
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
                        }, function (err) {
                            reject(err);
                        });
            }
        });
    },
    get: function (id) {
        return new Promise(function (resolve, reject) {
            if (id === null || typeof id === "undefined") {
                reject(new TPError(TPError.BadRequest, "Invalid trip ID"));
            } else {
                resolve(dbProvider.get(id));
            }
        });
    },
    create: function (trip) {
        return new Promise(function (resolve, reject) {
            if (!TripModel.isValid(trip)) {
                reject(new TPError(TPError.BadRequest, "Received object is not valid"));
            } else {
                var _t = new TripModel();
                _t.convert(trip);
                resolve(dbProvider.create(_t));
            }
        });
    },
    getAuthorId: function (id) {
        return dbProvider.getAuthorId(id);
    },
    remove: function (id, userId) {
        return new Promise(function (resolve, reject) {
            TripCtrl.getAuthorId(id)
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
                    }, function (err) {
                        reject(err);
                    });
        });
    }
};


module.exports = TripCtrl;