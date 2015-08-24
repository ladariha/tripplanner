"use strict";

var Promise = require("promise");
var dbProvider = require("./dao");
var tripDayCtrl = require("../../../tripday/controller");
var tripCtrl = require("../../../trip/controller");
var ExtModel = require("../../tripDayExtModel").TripDayExtension;
var TPError = require("../../../model/promiseError");

function RouteCtrl() {}

RouteCtrl.prototype.create = function (route, userId) {
    route = route || {};
    route.name = "route";
    route.author = userId;
    var self = this;
    return new Promise(function (resolve, reject) {
        if (!ExtModel.isValid(route)) {
            reject(new TPError(TPError.BadRequest, "Received object is not valid"));
        } else {
            tripCtrl.canUserEdit(route.tripId, userId)
                    .then(function () {
                        var _n = new ExtModel();
                        _n.convert(route);
                        dbProvider.create(_n)
                                .then(function (d) {
                                    return self.get(d);
                                })
                                .then(resolve, reject);

                    }, function () {
                        reject(new TPError(TPError.Unauthorized, "You cannot modify this trip"));
                    });
        }
    });
};
RouteCtrl.prototype.toClient = function (extensionData) {
    var _o = extensionData.toObject();
    delete _o.tripDayId;
    delete _o.tripId;
    _o.id = _o._id;
    delete _o.__v;
    delete _o._id;
    delete _o.data.rawDirectionData;
    return _o;
};

/**
 * Used only when client is accessing note via GET endpoint (for editing)
 * @param {type} id
 * @returns {undefined}
 */
RouteCtrl.prototype.getExt = function (id, dayId) {
    return tripDayCtrl.get(dayId).then(function (day) {
        return day.data.id(id);
    });
};
RouteCtrl.prototype.editExt = function (route, userId) {
    route = route || {};
    route.name = "note";
    route.author = userId;
    var self = this;
    return new Promise(function (resolve, reject) {
        if (!ExtModel.isValid(route)) {
            reject(new TPError(TPError.BadRequest, "Received object is not valid"));
        } else {
            tripCtrl.canUserEdit(route.tripId, userId)
                    .then(function () {
                        return dbProvider.edit(route);
                    }, function () {
                        reject(new TPError(TPError.Unauthorized, "You cannot modify this trip"));
                    })
                    .then(self.get)
                    .then(resolve, reject);
        }
    });
};

RouteCtrl.prototype.removeExt = function (noteId, dayId, userId) {

    return new Promise(function (resolve, reject) {
        tripDayCtrl.get(dayId)
                .then(function (day) {
                    return tripCtrl.canUserEdit(day.tripId, userId);
                }, function () {
                    reject(new TPError(TPError.NotFound, "Trip not foundYou cannot modify this trip"));
                })
                .then(function () {
                    console.log("=====");
                    resolve(dbProvider.remove(noteId, dayId));
                }, function () {
                    reject(new TPError(TPError.Unauthorized, "You cannot modify this trip"));
                });
    });
};

RouteCtrl.prototype.get = function (extensionData) {
    return new Promise(function (resolve) {
        resolve(RouteCtrl.prototype.toClient(extensionData));
    });
};


module.exports = new RouteCtrl();