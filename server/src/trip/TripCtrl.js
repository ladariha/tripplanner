"use strict";

var TripModel = require("./TripModel");
var Promise = require("promise");
var dbProvider = require("./TripDao");
var TPError = require("../model/promiseError");



var TripCtrl = {
    save: function () {

    },
    get: function (id) {
        return new Promise(function (resolve, reject) {
            if (id === null || typeof id === "undefined") {
                reject(new TPError(TPError.BadRequest, "Invalid trip ID"));
            }else{
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
    }

};


module.exports = TripCtrl;