"use strict";
var TripDayModel = require("./model");
var TPError = require("../model/promiseError");
var Promise = require("promise");
var dao = require("./dao");

var TripDayCtrl = {
    getEmptyDay: function (trip) {
        var td = new TripDayModel();
        td.date = trip.date;
        td.tripId = trip._id;
        td.name = "Day 1";
        return td;
    },
    getDaysForTrip: function (tripId) {
        return dao.getDaysForTrip(tripId);
    },
    create: function (tripDay) {
        if (!(tripDay instanceof TripDayModel)) {
            var _t = new TripModel();
            _t.convert(tripDay);
            tripDay = _t;
        }
        return new Promise(function (resolve, reject) {
            if (!TripDayModel.isValid(tripDay)) {
                reject(new TPError(TPError.BadRequest, "Received object is not valid"));
            } else {
                resolve(dao.create(tripDay));
            }
        });
    }


};


module.exports = TripDayCtrl;