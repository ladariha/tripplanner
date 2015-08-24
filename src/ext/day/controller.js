"use strict";
var Promise = require("promise");
var async = require("async");
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
        p = scopeFunctionDay(i, p, day, action);
    }

    return p;
}

/**
 * just to have index scoped
 */
function scopeFunctionDay(index, promise, day, action) {
    return promise.then(resolveExtension.bind(null, day, day.data[index].name, index, action));
}


/**
 * Returns function used for async.parallel(). The returned function resolves single extension for given day
 * @param {TripDay} day
 * @param {String} extensionName
 * @param {Number} extensionIndex
 * @param {String} action name of action (either get, remove, create, edit)
 * @returns {Function}
 */
function getAsyncTask(day, extensionName, extensionIndex, action) {
    return function (callback) {
        if (!extensions.hasOwnProperty(extensionName)) {
            callback(null, day);
        } else {
            extensions[extensionName][action](day.data[extensionIndex]).then(function (resolvedData) {
                day.data[extensionIndex] = resolvedData;
                callback(null, day);
            }, function (err) {
                console.log("Failed to get extension " + extensionName + " for day " + day._id);
                console.log(err);
                callback(null, day); // just ignore the problem and do not block day retrieval
            });
        }
    };
}

/**
 * Resolves days for given action (either get, remove, create, edit) using async.parallel
 * @param {TripDay[]} days  array of days
 * @param {String} action name of action
 */
function resolveDaysAsync(days, action) {
    var p = new Promise(function (resolve, reject) {
        var tasks = [];
        for (var j = 0, maxj = days.length; j < maxj; j++) {
            for (var i = 0, max = days[j].data.length; i < max; i++) {
                tasks.push(getAsyncTask(days[j], days[j].data[i].name, i, action));
            }
        }
        async.parallel(tasks, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(days);
            }
        });
    });

    return p;
}

/**
 * just to have index scoped
 */
function scopeFunction(index, promise, days) {
    return promise.then(resolveDay.bind(null, days[index], "get"));
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
 * @deprecated use TripDayExtCtrl.prototype.get instead, it resolves extensions asynchronously
 * @returns {undefined}
 */
TripDayExtCtrl.prototype.getPromises = function (days) {

    return new Promise(function (resolve, reject) {
        var p = Promise.resolve();

        for (var j = 0, maxj = days.length; j < maxj; j++) {
            p = scopeFunction(j, p, days);
        }

        p.then(function () {
            resolve(days);
        }, reject);
    });


};
/**
 * Called by tripday/controller before passing trip day to user so extensions
 * with some server side code can be resolved
 * @param {Array.TripDay} days
 * @returns {undefined}
 */
TripDayExtCtrl.prototype.get = function (days) {
    return resolveDaysAsync(days, "get");
};


module.exports = new TripDayExtCtrl();