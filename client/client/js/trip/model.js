"use strict";

angular.module("tripPlanner.trip.models", ["tripPlanner.utils"])
        .factory("tp.trip.models.TripModel", ["tp.validators", function(rules) {
                function Trip(units) {
                    this.id = -1;
                    this.tripDays = [];
                    this.date = new Date();
                    this.name = null;
                    this.units = units;
                    this.fuelType = "petrol";
                    this.consumption = 0;
                    this.consumptionUnits = "lkm";
                }

                Trip.prototype.isValid = function() {
                    for (var i = 0, max = this.tripDays.length; i < max; i++) {
                        if (!this.tripDays[i].isValid()) {
                            return false;
                        }
                    }
                    return rules.definedNotNull(this.date) &&  rules.definedNotNull(this.units) && rules.definedNotNull(this.name) && rules.definedNotNull(this.consumption) && !isNaN(this.consumption) && rules.definedNotNull(this.consumptionUnits);
                };

                return Trip;
            }]);