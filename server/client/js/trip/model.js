"use strict";

angular.module("tripPlanner.trip")
        .factory("tp.trip.TripModel", ["tp.validators", function (rules) {
                function Trip(units) {
                    this.id = -1;
                    this.tripDays = [];
                    this.editors = [];
                    this.owner = null;
                    this.date = null;
                    this.name = null;
                    this.units = units;
                    this.fuelType = "petrol";
                    this.consumption = 0;
                    this.consumptionUnits = "lkm";
                }
                
                Trip.prototype.isValid = function () {
                    for (var i = 0, max = this.tripDays.length; i < max; i++) {
                        if (!this.tripDays[i].isValid()) {
                            return false;
                        }
                    }
                    return rules.definedNotNull(this.date) && rules.definedNotNull(this.units) && rules.definedNotNull(this.name) && rules.definedNotNull(this.consumption) && !isNaN(this.consumption) && rules.definedNotNull(this.consumptionUnits);
                };
                
                Trip.prototype.convertFromServer = function (obj) {
                    this.units = obj.units;
                    this.fuelType = obj.fuelType;
                    this.consumption = obj.consumption;
                    this.consumptionUnits = obj.consumptionUnits;
                    this.date = obj.date;
                    this.name = obj.name;
                    this.owner = obj.owner;
                    this.editors = obj.editors;
                    this.id = obj.id;
                    
                    // tripDays
                    // editors
                };

                return Trip;
            }]);