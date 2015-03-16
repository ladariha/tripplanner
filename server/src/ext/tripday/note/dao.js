"use strict";

var Promise = require("promise");
var TPError = require("../../../model/promiseError");
var Note = require("../../tripDayExtModel");

var noteProvider = {
    create: function (note) {
        return new Promise(function (resolve, reject) {
            note.save(function (err, obj) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to save data to db", err));
                } else {
                    resolve(obj);
                }
            });
        });
    }
};

module.exports = noteProvider;



