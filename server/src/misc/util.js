"use strict";

var fs = require("fs");
var path = require("path");

exports.endsWith = function (pattern, suffix) {
    return pattern.indexOf(suffix, pattern.length - suffix.length) !== -1;
};
/**
 * Returns all files in given directory
 * @param {type} path
 * @returns {Array} array of file names in given path
 */
exports.listFiles = function (path) {
    var arr = [];
    var files = fs.readdirSync(path);
    files.forEach(function (file) {
        if (exports.endsWith(file, "js")) {
            arr.push(path + file);
        }
    });
    return arr;
};

exports.listFoldersAndNames = function (folder) {
    var arr = {};
    var files = fs.readdirSync(folder);
    files.forEach(function (file) {
        if (fs.statSync(path.join(folder, file)).isDirectory()) {
            arr[file] = path.join(folder, file); // TODO problem with same filename in different folder
        }
    });
    return arr;
};



exports.listFilesAndNames = function (path) {

    var arr = {};
    var files = fs.readdirSync(path);
    var _s;
    files.forEach(function (file) {
        if (exports.endsWith(file, "js")) {
            _s = file.substring(0, file.indexOf(".js"));
            arr[_s] = path + file; // TODO problem with same filename in different folder
        }
    });
    return arr;
};

exports.errorRespond = function (response, errCode, errMsg) {
    response.writeHead(errCode, {
        "Content-Type": "text/plain"
    });
    response.write(errMsg);
    response.end();
};
/**
 * Converts date string in form of <code>2014-12-18 23:00:00</code> to Date object
 * @param {String} dateString string to be converted to date
 * @returns {Date} converted date object
 */
exports.UTCToDate = function (dateString) {
    var _d = new Date();
    var _split = dateString.split(" ");
    var _yearMonthDay;
    var _time;

    _yearMonthDay = _split[0].split("-");
    _yearMonthDay.forEach(function (item, index) {
        _yearMonthDay[index] = parseInt(item, 10);
    });

    _time = _split[1].split(":");
    _time.forEach(function (item, index) {
        _time[index] = parseInt(item, 10);
    });

    _d.setUTCFullYear(_yearMonthDay[0]);
    _d.setUTCMonth(_yearMonthDay[1] - 1);
    _d.setUTCDate(_yearMonthDay[2]);
    _d.setUTCHours(_time[0]);
    _d.setUTCMinutes(_time[1]);
    _d.setUTCSeconds(_time[2]);

    return _d;
};

exports.dateToUTC = function (date) {
    return date.getUTCFullYear() +
            "-" + ((date.getUTCMonth() + 1 < 10) ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)) +
            "-" + ((date.getUTCDate() < 10) ? "0" + date.getUTCDate() : date.getUTCDate()) +
            " " + ((date.getUTCHours() < 10) ? "0" + date.getUTCHours() : date.getUTCHours()) +
            ":" + ((date.getUTCMinutes() < 10) ? "0" + date.getUTCMinutes() : date.getUTCMinutes()) +
            ":" + ((date.getUTCSeconds() < 10) ? "0" + date.getUTCSeconds() : date.getUTCSeconds());
};

exports.definedNotNull = function (obj) {
    return (typeof obj !== "undefined" && obj !== null);
};