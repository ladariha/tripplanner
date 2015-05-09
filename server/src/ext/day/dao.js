"use strict";

var Promise = require("promise");
var TPError = require("../../model/promiseError");
var tripDayCtrl = require("../../tripday/controller");

function ExtDao() {}


ExtDao.prototype.create = function (ext) {
    return new Promise(function (resolve, reject) {
        delete ext.id;
        tripDayCtrl
                .get(ext.tripDayId)
                .then(function (day) {
                    day.data.push(ext);
                    day.save(function (err) {
                        if (err) {
                            reject(new TPError(TPError.DatabaseError, "Unable to save data to db"));
                        } else {
                            resolve(ext);
                        }
                    });
                }, reject);
    });
};
ExtDao.prototype.edit = function (ext) {
    return new Promise(function (resolve, reject) {
        tripDayCtrl
                .get(ext.tripDayId)
                .then(function (day) {
                    var result = day.data.id(ext.id).convert(ext, true);
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
ExtDao.prototype.remove = function (extId, dayId) {
    return new Promise(function (resolve, reject) {
        tripDayCtrl
                .get(dayId)
                .then(function (day) {
                    day.data.id(extId).remove();
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

module.exports = ExtDao;



