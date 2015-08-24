"use strict";

var Promise = require("promise");


function NoteCtrl() {}

NoteCtrl.prototype.get = function () {
    return new Promise(function (resolve) {
//        setTimeout(function(){
            resolve({"a" :1});
//        }, 5000);
    });
};


module.exports = new NoteCtrl();