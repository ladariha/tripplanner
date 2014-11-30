"use strict";


var Promise = require("promise");
var dbProvider = require("./userDao");
var TPError = require("../model/promiseError");



var UserCtrl = {
    get: function (id) {
        return new Promise(function (resolve, reject) {
            if (id === null || typeof id === "undefined") {
                reject(new TPError(TPError.BadRequest, "Invalid user ID"));
            }else{
                resolve(dbProvider.get(id));
            }
        });
    }

};


module.exports = UserCtrl;