"use strict";

var Promise = require("promise");


function NoteCtrl() {}

NoteCtrl.prototype.get = function (extensionData) {
    return new Promise(function (resolve, reject) {
//        setTimeout(function(){
            resolve({"a" :1});
//        }, 5000);
    });
};


module.exports = new NoteCtrl();