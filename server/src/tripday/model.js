"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var definedNotNull = require("../misc/util").definedNotNull;
var Extension = require("../ext/tripday/model");
var TripDay = new Schema(
        {
            tripId: String,
            date: String,
            data: [{type: Extension}],
            name: {type: String, index: true}
        }
);

/**
 * Converts properties of tripday object received from client to server properties of tripday model
 */
TripDay.methods.convert = function (obj, includeId) {

    this.date = obj.date;
    this.data = obj.data;
    this.name = obj.name;
    this.tripId = obj.tripId;
    this.id = includeId ? obj.id : this.id;
    return this;
};

TripDay.methods.toClient = function () {
    var _o = this.toObject();
    _o.id = _o._id;
    delete _o._id;
    return _o;
};

TripDay.statics.isValid = function (obj) {
    return  definedNotNull(obj.tripId) &&
            definedNotNull(obj.date) && definedNotNull(obj.data) &&
            definedNotNull(obj.name) && typeof obj.name === "string";
};

module.exports = mongoose.model("TripDay", TripDay);