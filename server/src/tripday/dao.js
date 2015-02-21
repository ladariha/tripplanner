"use strict";

var Promise = require("promise");
var TPError = require("../model/promiseError");
var TripDay = require("./model");

var tripDayProvider = {
    create: function (tripday) {
        return new Promise(function (resolve, reject) {
            tripday.save(function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to save data to db", err));
                } else {
                    resolve(obj);
                }
            });
        });
    },
    remove: function (id) {
        return new Promise(function (resolve, reject) {
            TripDay.remove({"_id": id}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to remove given day", err));
                } else {
                    resolve("Day removed");
                }
            });
        });
    },
    edit: function (tripDay) {
        return new Promise(function (resolve, reject) {
            tripDayProvider
                    .get(tripDay.id)
                    .then(function (original) {
                        original.convert(tripDay, true);
                        return tripDayProvider._save(original);
                    })
                    .then(function (updatedTrip) {
                        resolve(updatedTrip);
                    }, function (err) {
                        reject(err);
                    });
        });
    },
    _save: function (tripDay) {
        return new Promise(function (resolve, reject) {
            tripDay.save(function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to save data to db", err));
                } else {
                    resolve(obj);
                }
            });
        });
    },
    get: function (id) {
        return new Promise(function (resolve, reject) {
            TripDay.findOne({"_id": id}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to find data in db", err));
                } else if (obj === null) {
                    reject(new TPError(TPError.NotFound, "Unable to find given day", err));
                } else {
                    resolve(obj);
                }
            });
        });
    },
    getDaysForTrip: function (tripId) {
        return new Promise(function (resolve, reject) {
            TripDay.find({"tripId": tripId}, null, {sort: {"date": 1}}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to find data in db", err));
                } else if (obj === null) {
                    reject(new TPError(TPError.NotFound, "Unable to find any days for given trip", err));
                } else {
                    resolve(obj);
                }
            });
        });
    },
    getTripId: function (tripDayId) {
        return new Promise(function (resolve, reject) {
            TripDay.findOne({"_id": tripDayId}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to find data in db", err));
                } else if (obj === null) {
                    reject(new TPError(TPError.NotFound, "Unable to find any days for given ID", err));
                } else {
                    resolve(obj.tripId);
                }
            });
        });
    }

};

module.exports = tripDayProvider;



