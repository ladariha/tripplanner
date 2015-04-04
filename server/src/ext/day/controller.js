"use strict";

var extensions = [];
var tripDayExtCtrl = {
    getExtensions: function () {
        var info = {};

        for (var i = 0, max = extensions.length; i < max; i++) {
            info[extensions[i]] = require('./' + extensions[i] + "/client.json");
        }
        return info;

    },
    registerExtension: function (extensionName) {
        if (extensions.indexOf(extensionName) > -1) {
            throw new Error("Extension with given name already exists");
        } else {
            extensions.push(extensionName);
        }
    }
};

exports.getExtensions = tripDayExtCtrl.getExtensions;
exports.registerExtension = tripDayExtCtrl.registerExtension;