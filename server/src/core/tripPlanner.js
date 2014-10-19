"use strict";

/**
 * Checks if 
 * @param {type} ext
 * @returns {undefined}
 */
exports.isExtensionValid = function(ext){
    return typeof ext.create === "function" && typeof ext.remove === "function" && typeof ext.edit === "function" && typeof ext.get === "function";
};