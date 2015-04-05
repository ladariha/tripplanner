"use strict";

var Promise = require("promise");
var TPError = require("../model/promiseError");
var Trip = require("./model");

function TripDao() {}

TripDao.prototype.create = function (trip) {
    return new Promise(function (resolve, reject) {
        trip.save(function (err, obj) {
            if (err) {
                reject(new TPError(TPError.DatabaseError, "Unable to save data to db", err));
            } else {
                resolve(obj);
            }
        });
    });
};
TripDao.prototype._save = function (trip) {
    return new Promise(function (resolve, reject) {
        trip.save(function (err, obj) {
            if (err) {
                reject(new TPError(TPError.DatabaseError, "Unable to save data to db", err));
            } else {
                resolve(obj);
            }
        });
    });
};
TripDao.prototype.getAuthorId = function (id) {
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
};
TripDao.prototype.getEditorsId = function (tripId) {
    return new Promise(function (resolve, reject) {
        Trip.findOne({"_id": tripId}, function (err, obj) {
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
};
TripDao.prototype.remove = function (id) {
    return new Promise(function (resolve, reject) {
        Trip.remove({"_id": id}, function (err, obj) {
            if (err) {
                reject(new TPError(TPError.DatabaseError, "Unable to remove given trip", err));
            } else {
                resolve("Trip removed");
            }
        });
    });
};
TripDao.prototype.edit = function (trip) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self
                .get(trip.id)
                .then(function (original) {
                    original.convert(trip, true);
                    return self._save(original);
                })
                .then(resolve, reject);
    });
};
TripDao.prototype.get = function (id) {
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
};
TripDao.prototype.getUsersTrips = function (userId) {
    return new Promise(function (resolve, reject) {
        Trip.find({"owner": userId}, function (err, docs) {
            if (err) {
                reject(new TPError(TPError.DatabaseError, "Unable to find data in db", err));
            } else if (docs === null) {
                reject(new TPError(TPError.NotFound, "Unable to find given trip", err));
            } else {
                var trips = [];
                for (var i = 0, imax = docs.length; i < imax; i++) {
                    trips.push({"name": docs[i].name, "id": docs[i]._id});
                }

                resolve(trips);
            }
        });
    });
};

module.exports = new TripDao();



