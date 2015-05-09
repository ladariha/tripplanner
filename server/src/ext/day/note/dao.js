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
                            resolve(note);
                        }
                    });
                }, reject);
    });
};
NoteDao.prototype.edit = function (note) {
    return new Promise(function (resolve, reject) {
        tripDayCtrl
                .get(note.tripDayId)
                .then(function (day) {
                    var result = day.data.id(note.id).convert(note, true);
                    day.save(function (err) {
                        if (err) {
                            reject(new TPError(TPError.DatabaseError, "Unable to save data to db"));
                        } else {
                            resolve(result);
                        }
                    });
                }, reject);
    });
};
NoteDao.prototype.remove = function (noteId, dayId) {
    return new Promise(function (resolve, reject) {
        tripDayCtrl
                .get(dayId)
                .then(function (day) {
                    day.data.id(noteId).remove();
                    day.save(function (err) {
                        if (err) {
                            reject(new TPError(TPError.DatabaseError, "Unable to save data to db"));
                        } else {
                            resolve("Note removed");
                        }
                    });
                }, reject);
    });
};

module.exports = new NoteDao();



