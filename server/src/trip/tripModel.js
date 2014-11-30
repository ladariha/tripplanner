"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var definedNotNull = require("../misc/util").definedNotNull;
var Trip = new Schema(
        {
            units: String,
            fuelType: String,
            consumption: Number,
            consumptionUnits: String,
            date: String,
            owner : String,
            editors : [{type: String}],
            name: {type: String, index: true}
        }
);

/**
 * Converts properties of trip object received from client to server properties of trip model
 * @param {type} obj
 * @param {type} includeId if obj.id should be also assigned to this.id
 * @returns {undefined}
 */
Trip.methods.convert = function (obj, includeId) {
    this.units = obj.units;
    this.fuelType = obj.fuelType;
    this.consumption = obj.consumption;
    this.consumptionUnits = obj.consumptionUnits;
    this.date = obj.date;
    this.name = obj.name;
    this.owner = obj.owner;
    this.editors = obj.editors;
    this.id = includeId ? obj.id : this.id;
    return this;
};

Trip.methods.toClient = function(){
    var _o = this.toObject();
    _o.id = _o._id;
    delete _o._id;
    return _o;
};

Trip.statics.isValid = function (obj) {
    return  definedNotNull(obj.date) &&
            definedNotNull(obj.editors) &&
            definedNotNull(obj.owner) && (typeof obj.owner === "string" || typeof obj.owner === "number") &&
            definedNotNull(obj.units) && typeof obj.units === "string" &&
            definedNotNull(obj.name) && typeof obj.name === "string" &&
            definedNotNull(obj.fuelType) && typeof obj.fuelType === "string" &&
            definedNotNull(obj.consumption) && typeof obj.consumption === "number" &&
            !isNaN(obj.consumption) &&
            definedNotNull(obj.consumptionUnits) && typeof obj.name === "string";
};

module.exports = mongoose.model("Trip", Trip);