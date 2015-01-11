"use strict";

angular.module("tripPlanner.trip")
        .factory("tp.trip.TripModel", ["tp.validators", "tp.TimeDateConvertor", "tp.tripDay.TripDayModel", function (rules, TimeDateConvertor, TripDay) {
                function Trip(units) {
                    this.id = -1;
                    this.days = [];
                    this.editors = [];
                    this.owner = null;
                    this.date = null;
                    this.localDate = null;
                    this.name = null;
                    this.units = units;
                    this.fuelType = "petrol";
                    this.consumption = 0;
                    this.consumptionUnits = "lkm";
                }

                Trip.prototype.getPrettyConsumptionUnits = function () {
                    switch (this.consumptionUnits) {
                        case "lkm" :
                            return "l/100km";
                        case "kml":
                            return "km/l";
                        case "mpg_uk":
                        case "mpg_us":
                            return "mpg";
                        case "mil":
                            return "mi/l";
                        default:
                            return "";
                    }
                };

                Trip.prototype.isValid = function () {
                    return (rules.definedNotNull(this.date) || rules.definedNotNull(this.localDate)) && rules.definedNotNull(this.units) && rules.definedNotNull(this.name) && rules.definedNotNull(this.consumption) && !isNaN(this.consumption) && rules.definedNotNull(this.consumptionUnits);
                };

                Trip.prototype.convertFromServer = function (obj) {
                    this.units = obj.units;
                    this.fuelType = obj.fuelType;
                    this.consumption = obj.consumption;
                    this.consumptionUnits = obj.consumptionUnits;
                    this.date = obj.date;
                    this.localDate = TimeDateConvertor.UTCToDate(obj.date).toPrettyString(" ", false);
                    this.name = obj.name;
                    this.owner = obj.owner;
                    this.editors = obj.editors;
                    this.id = obj.id;

                    // tripDays
                    this.days = [];
                    for (var i = 0, max = obj.days.length; i < max; i++) {
                        this.days.push(new TripDay().convertFromServer(obj.days[i]));
                    }
                    return this;
                    // editors
                };

                return Trip;
            }]);