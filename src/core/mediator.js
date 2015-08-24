"use strict";

var EventEmitter = require("events").EventEmitter;
var util = require("util");

function Emitter() {
}

util.inherits(Emitter, EventEmitter);

module.exports = new Emitter();