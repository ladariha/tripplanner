"use strict";

angular.module("tripPlanner.place")
        .factory("tp.place.PlaceModel", ["tp.validators", function PlaceModel(rules) {
                function Place(label, lat, long) {
                    this.label = label;
                    this.latitude = lat;
                    this.longitude = long;
                    this.id = new Date().getTime();
                }

                Place.prototype.isValid = function() {
                    return rules.definedNotNull(this.label) && rules.definedNotNull(this.latitude) && rules.definedNotNull(this.longitude) && rules.definedNotNull(this.id);
                };

                return Place;
            }]);