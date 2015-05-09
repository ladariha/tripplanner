"use strict";

var Promise = require("promise");
var dbProvider = require("./dao");
var tripDayCtrl = require("../../../tripday/controller");
var tripCtrl = require("../../../trip/controller");
var ExtModel = require("../../tripDayExtModel").TripDayExtension;
var TPError = require("../../../model/promiseError");

function NoteCtrl() {}

NoteCtrl.prototype.create = function (note, userId) {
    note = note || {};
    note.name = "note";
    note.author = userId;
    var self = this;
    return new Promise(function (resolve, reject) {
        if (!ExtModel.isValid(note)) {
            reject(new TPError(TPError.BadRequest, "Received object is not valid"));
        } else {
            tripCtrl.canUserEdit(note.tripId, userId)
                    .then(function () {
                        var _n = new ExtModel();
                        _n.convert(note);
                        _n.data = _n.data.sanitize();
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
NoteCtrl.prototype.toClient = function (extensionData) {
    var _o = extensionData.toObject();
    delete _o.tripDayId;
    delete _o.tripId;
    _o.id = _o._id;
    delete _o.__v;
    delete _o._id;
    return _o;
};

/**
 * Used only when client is accessing note via GET endpoint (for editing)
 * @param {type} id
 * @returns {undefined}
 */
NoteCtrl.prototype.getExt = function (id, dayId) {
    return tripDayCtrl.get(dayId).then(function (day) {
        return day.data.id(id);
    });
};
NoteCtrl.prototype.editExt = function (note, userId) {
    note = note || {};
    note.name = "note";
    note.author = userId;
    var self = this;
    return new Promise(function (resolve, reject) {
        if (!ExtModel.isValid(note)) {
            reject(new TPError(TPError.BadRequest, "Received object is not valid"));
        } else {
            tripCtrl.canUserEdit(note.tripId, userId)
                    .then(function () {
                        return dbProvider.edit(note);
                    }, function () {
                        reject(new TPError(TPError.Unauthorized, "You cannot modify this trip"));
                    })
                    .then(self.get)
                    .then(resolve, reject);
        }
    });
};

NoteCtrl.prototype.removeExt = function (noteId, dayId, userId) {

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

NoteCtrl.prototype.get = function (extensionData) {
    return new Promise(function (resolve) {
        resolve(NoteCtrl.prototype.toClient(extensionData));
    });
};


module.exports = new NoteCtrl();