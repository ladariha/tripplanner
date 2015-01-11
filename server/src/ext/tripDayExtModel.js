"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var definedNotNull = require("../misc/util").definedNotNull;
var TripDayExtension = new Schema(
        {
            tripDayId: String,
            data: [{type: Object}],
            name: {type: String, index: true}
        }
);

/**
 * Converts properties of tripday object received from client to server properties of tripday model
 */
TripDayExtension.methods.convert = function (obj, includeId) {

    this.data = obj.data;
    this.name = obj.name;
    this.tripDayId = obj.tripDayId;
    this.id = includeId ? obj.id : this.id;
    return this;
};

TripDayExtension.methods.toClient = function () {
    var _o = this.toObject();
    _o.id = _o._id;
    delete _o._id;
    return _o;
};

TripDayExtension.statics.isValid = function (obj) {
    return  definedNotNull(obj.tripDayId) &&
            definedNotNull(obj.data) &&
            definedNotNull(obj.name) && typeof obj.name === "string";
};

module.exports = mongoose.model("TripDayExtension", TripDayExtension);