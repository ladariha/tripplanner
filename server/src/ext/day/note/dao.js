"use strict";

var Promise = require("promise");
var TPError = require("../../../model/promiseError");
var Note = require("../../tripDayExtModel");
var tripDayCtrl = require("../../../tripday/controller");

var noteProvider = {
    create: function (note) {
        return new Promise(function (resolve, reject) {
            delete note.id;
            tripDayCtrl.get(note.tripDayId).then(function (day) {
                day.data.push(note);
                day.save(function (err) {
                    err ? reject(new TPError(TPError.DatabaseError, "Unable to save data to db")) : resolve();
                });
            }, reject);
        });
    }
};

module.exports = noteProvider;



