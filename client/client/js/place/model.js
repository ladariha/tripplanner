"use strict";

angular.module("tripPlanner.place", ["tripPlanner.utils"])
        .factory("tp.place.models.PlaceModel", ["tp.validators", function (rules) {
                function Place(label, lat, long) {
                    this.label = label;
                    this.latitude = lat;
                    this.longitude = long;
                }

                Place.prototype.isValid = function() {
                    return rules.definedNotNull(this.label) && rules.definedNotNull(this.latitude) && rules.definedNotNull(this.longitude);
                };

                return Place;
            }]);