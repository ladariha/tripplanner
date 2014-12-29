"use strict";

angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayModel", ["tp.validators", "tp.place.PlaceModel", function (rules, Place) {
                function TripDay(avoids) {
                    this.id = -1;
                    this.tripId = -1;
                    this.name = "";
                    this.data = [];
                    this.date = null;
                }

                TripDay.prototype.isValid = function () {
                    return rules.definedNotNull(this.tripId) && rules.definedNotNull(this.name) && rules.definedNotNull(this.data) && rules.definedNotNull(this.date);
                };

                return TripDay;
            }]);
   