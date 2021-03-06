"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var utils = require("../misc/util");
var definedNotNull = utils.definedNotNull;
var Extension = require("../ext/tripDayExtModel").schema;

var TripDay = new Schema(
        {
            tripId: String,
            date: Date,
            description: String,
            data: [Extension],
            name: {type: String, index: true}
        }
);

/**
 * Converts properties of tripday object received from client to server properties of tripday model
 */
TripDay.methods.convert = function (obj, includeId) {

    this.date = utils.UTCToDate(obj.date);
    this.data = obj.data || [];
    this.name = obj.name;
    this.description = obj.description;
    this.tripId = obj.tripId;
    this.id = includeId ? obj.id : this.id;
    return this;
};

TripDay.methods.toClient = function () {
    var _o = this.toObject();
    _o.id = _o._id;
    _o.date = utils.dateToUTC(_o.date);
    delete _o._id;
    delete _o.__v;
    return _o;
};

TripDay.statics.isValid = function (obj) {
    return  definedNotNull(obj.tripId) && definedNotNull(obj.description) &&
            definedNotNull(obj.date) && definedNotNull(obj.data) &&
            definedNotNull(obj.name) && typeof obj.name === "string";
};

module.exports = mongoose.model("TripDay", TripDay);