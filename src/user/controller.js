"use strict";


var Promise = require("promise");
var dbProvider = require("./dao");
var TPError = require("../model/promiseError");
var tripCtrl = require("../trip/controller");

function UserCtrl() {}

UserCtrl.prototype.get = function (id, convertToObj) {
    return new Promise(function (resolve, reject) {
        if (id === null || typeof id === "undefined") {
            reject(new TPError(TPError.BadRequest, "Invalid user ID"));
        } else {
            var res = null;
            dbProvider.get(id)
                    .then(function (user) {
                        res = convertToObj ? user.toClient() : user;
                        return tripCtrl.getTripsForUser(id);
                    })
                    .then(function (trips) {
                        res.trips = trips;
                        resolve(res);
                    }, reject);
        }
    });
};

module.exports = new UserCtrl();