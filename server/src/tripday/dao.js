"use strict";

var Promise = require("promise");
var TPError = require("../model/promiseError");
var TripDay = require("./model");

var TripDayDao = {
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
    edit: function (trip) {
        
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
            TripDay.find({"tripId": tripId}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to find data in db", err));
                } else if (obj === null) {
                    reject(new TPError(TPError.NotFound, "Unable to find any days for given trip", err));
                } else {
                    resolve(obj);
                }
            });
        });
    }

};

module.exports = TripDayDao;



