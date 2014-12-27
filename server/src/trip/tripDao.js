"use strict";

var Promise = require("promise");
var TPError = require("../model/promiseError");
var Trip = require("./tripModel");

var TripProvider = {
    create: function (trip) {
        return new Promise(function (resolve, reject) {
            trip.save(function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to save data to db", err));
                } else {
                    resolve(obj);
                }
            });
        });
    },
    _save: function (trip) {
        return new Promise(function (resolve, reject) {
            trip.save(function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to save data to db", err));
                } else {
                    resolve(obj);
                }
            });
        });
    },
    getAuthorId: function (id) {
        return new Promise(function (resolve, reject) {
            Trip.findOne({"_id": id}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to find given trip", err));
                } else if (obj === null) {
                    reject(new TPError(TPError.NotFound, "Unable to find given trip", err));
                } else {
                    resolve(obj.owner);
                }
            });
        });
    },
    getEditorsId: function (id) {
        return new Promise(function (resolve, reject) {
            Trip.findOne({"_id": id}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to find given trip", err));
                } else if (obj === null) {
                    reject(new TPError(TPError.NotFound, "Unable to find given trip", err));
                } else {
                    var editors = [];
                    editors.push(obj.owner);

                    for (var i = 0, imax = obj.editors.length; i < imax; i++) {
                        editors.push(obj.editors[i]);
                    }

                    resolve(editors);
                }
            });
        });
    },
    remove: function (id) {
        return new Promise(function (resolve, reject) {
            Trip.remove({"_id": id}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to remove given trip", err));
                } else {
                    resolve("Trip removed");
                }
            });
        });
    },
    edit: function (trip) {
        return new Promise(function (resolve, reject) {
            TripProvider
                    .get(trip.id)
                    .then(function (original) {
                        original.convert(trip, true);
                        return TripProvider._save(original);
                    })
                    .then(function (updatedTrip) {
                        resolve(updatedTrip);
                    }, function (err) {
                        reject(err);
                    });
        });
    },
    get: function (id) {
        return new Promise(function (resolve, reject) {
            Trip.findOne({"_id": id}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to find data in db", err));
                } else if (obj === null) {
                    reject(new TPError(TPError.NotFound, "Unable to find given trip", err));
                } else {
                    resolve(obj);
                }
            });
        });
    }

};

module.exports = TripProvider;



