"use strict";

var Promise = require("promise");
var TPError = require("../model/promiseError");
var User = require("./model");

var UserProvider = {
    get: function (id) {
        return new Promise(function (resolve, reject) {
            User.findOne({"_id": id}, function (err, user) {
                if (err) {
                    reject(new TPError(TPError.DatabaseError, "Unable to find user", err));
                } else {
                    resolve(user);
                }
            });
        });
    }
};

module.exports = UserProvider;