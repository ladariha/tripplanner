"use strict";

var Promise = require("promise");
var TPError = require("../model/promiseError");

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
    save: function (trip, callback) {

    },
    get: function (id, callback) {

    }

};

module.exports = TripProvider;



