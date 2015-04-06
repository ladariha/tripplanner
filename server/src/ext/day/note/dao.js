"use strict";

var Promise = require("promise");
var TPError = require("../../../model/promiseError");
var tripDayCtrl = require("../../../tripday/controller");

function NoteDao() {}


NoteDao.prototype.create = function (note) {
    return new Promise(function (resolve, reject) {
        delete note.id;
        tripDayCtrl
                .get(note.tripDayId)
                .then(function (day) {
                    day.data.push(note);
                    day.save(function (err) {
                        if (err) {
                            reject(new TPError(TPError.DatabaseError, "Unable to save data to db"));
                        } else {
                            resolve();
                        }
                    });
                }, reject);
    });
};

module.exports = new NoteDao();



