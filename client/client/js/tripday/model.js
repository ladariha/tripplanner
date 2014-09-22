"use strict";

angular.module("tripPlanner.tripDay.models", ["tripPlanner.utils", "tripPlanner.place.models"])
        .factory("tp.tripDay.models.TripDayModel", ["tp.validators", "tp.place.models.PlaceModel", function(rules, Place) {
                function TripDay(avoids) {
                    this.id = -1;
                    this.tripId = -1;
                    this.from = new Place();
                    this.to = new Place();
                    this.avoids = avoids;
                    this.date = new Date();
                    this.duration = 0;
                    this.distance = 0;
                }

                TripDay.prototype.isValid = function() {
                    return this.from.isValid() && this.to.isValid() && rules.definedNotNull(this.date);
                };

                TripDay.prototype.setPlace = function(place, identifier) {
                    if (place instanceof Place && place.isValid()) {
                        this[identifier] = place;
                    } else {
                        throw new TypeError("Provided place for '" + identifier + "' is not a valid option. ");
                    }
                };

                return TripDay;
            }]);
   