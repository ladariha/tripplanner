"use strict";
var Promise = require("promise");
var extensions = {};

/**
 * Resolves given extension for given day
 * @param {type} day
 * @param {type} extensionName
 * @param {type} extensionIndex
 * @param {type} action
 * @returns {nm$_controller.Promise}
 */
function resolveExtension(day, extensionName, extensionIndex, action) {

    return new Promise(function (resolve) {

        if (!extensions.hasOwnProperty(extensionName)) {
            resolve(day);
        } else {
            extensions[extensionName][action](day.data[extensionIndex]).then(function (resolvedData) {
                day.data[extensionIndex] = resolvedData;
                resolve(day);
            }, function (err) {
                console.log("Failed to get extension " + extensionName + " for day " + day._id);
                console.log(err);
                resolve(day); // just ignore the problem and do not block day retrieval
            });
        }
    });
}

/**
 * Resolves all extensions for given day
 * @param {TripDay} day
 * @param {String} action
 * @returns {Promise}
 */
function resolveDay(day, action) {
    var p = Promise.resolve();
    for (var i = 0, max = day.data.length; i < max; i++) {
        (function (index) {
            p = p.then(resolveExtension.bind(null, day, day.data[index].name, index, action));
        }(i));
    }

    return p;
}

function TripDayExtCtrl() {}


TripDayExtCtrl.prototype.getClientExtensions = function () {
    var info = {};

    for (var e in extensions) {
        if (extensions.hasOwnProperty(e)) {
            info[e] = require("./" + e + "/client.json");
        }
    }
    return info;

};
TripDayExtCtrl.prototype.registerExtension = function (extensionName) {
    if (extensions.hasOwnProperty(extensionName)) {
        throw new Error("Extension with given name already exists");
    } else {
        extensions[extensionName] = require("./" + extensionName + "/" + "controller");
    }
};
/**
 * Called by tripday/controller before passing trip day to user so extensions
 * with some server side code can be resolved
 * @param {Array.TripDay} days
 * @returns {undefined}
 */
TripDayExtCtrl.prototype.get = function (days) {

    return new Promise(function (resolve, reject) {
        var p = Promise.resolve();

        for (var j = 0, maxj = days.length; j < maxj; j++) {
            (function (index) {
                p = p.then(resolveDay.bind(null, days[index], "get"));
            }(j));
        }

        p.then(function () {
            resolve(days);
        }, reject);
    });


};


module.exports = new TripDayExtCtrl();