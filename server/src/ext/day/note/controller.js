"use strict";

var ExtModel = require("../../tripDayExtModel").TripDayExtension;
var TPError = require("../../../model/promiseError");
var Promise = require("promise");
var dbProvider = require("./dao");

var noteCtrl = {
    create: function (note, userId) {
        note = note || {};
        note.name = "note";
        note.author = userId;
        return new Promise(function (resolve, reject) {
            if (!ExtModel.isValid(note)) {
                reject(new TPError(TPError.BadRequest, "Received object is not valid"));
            } else {
                var _n = new ExtModel();
                _n.convert(note);
                _n.data = _n.data.sanitize();
                dbProvider.create(_n).then(resolve, reject);
            }
        });
    }

};


module.exports = noteCtrl;