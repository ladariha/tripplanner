"use strict";

var Promise = require("promise");
var TPError = require("../model/promiseError");
var Trip = require("./TripModel");

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
    update: function (trip, callback) {

    },
    get: function (id) {
        return new Promise(function (resolve, reject) {
            Trip.findOne({"_id" : id}, function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to find data in db", err));
                } else {
                    resolve(obj);
                }
            });
        });
    }

};

module.exports = TripProvider;



