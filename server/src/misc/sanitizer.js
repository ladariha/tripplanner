"use strict";

var sanitizer = require("sanitizer");
/**
 * Removes unsafe tags and attributes from html
 * @param {String} inputData
 * @returns {String} stripped String
 */
String.prototype.sanitize = function () {
    return sanitizer.sanitize(this);
};

/**
 * Removes unsafe tags and attributes from html
 * @param {String} inputData
 * @returns {String} stripped String
 */
exports.sanitize = function (inputData) {
    return sanitizer.sanitize(inputData);
};