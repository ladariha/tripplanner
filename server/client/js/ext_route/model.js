"use strict";
angular.module("tripPlanner.extension.route")
        .factory("tp.ext.route.RouteModel", ["tp.ext.TripDayExtModel", "tp.place.PlaceModel", "tp.validators",
            function RouteModel(DayExtensionModel, Place, rules) {

                function Route(tripId, tripDayId) {
                    DayExtensionModel.apply(this, [tripId, tripDayId]);
                    this.name = "route";
                    this.data = {
                        name: "",
                        from: null,
                        to: null,
                        waypoints: [],
                        avoids: {
                            highways: false,
                            tolls: false
                        }
                    };
                }


                Route.prototype = Object.create(DayExtensionModel.prototype);

                Route.prototype.isValid = function () {
                    for (var i = 0, max = this.data.waypoints.length; i < max; i++) {
                        if (!this.data.waypoints[i].isValid()) {
                            return false;
                        }
                    }

                    return DayExtensionModel.prototype.isValid.apply(this) &&
                            rules.definedNotNull(this.data.name) &&
                            rules.definedNotNull(this.data.from) && this.data.from.isValid() &&
                            rules.definedNotNull(this.data.to) && this.data.to.isValid();
                };

                Route.prototype.setPlace = function (place, identifier) {
                    switch (identifier) {
                        case "to" :
                            this.data.to = place;
                            break;
                        case "from":
                            this.data.from = place;
                            break;
                        default:
                            this.data.waypoints.push(place);
                            break;

                    }
                };

                return Route;

            }
        ]);