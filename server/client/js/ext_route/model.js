"use strict";
angular.module("tripPlanner.extension.route")
        .factory("tp.ext.route.RouteModel", ["tp.ext.TripDayExtModel","tp.place.PlaceModel",
            function RouteModel(DayExtensionModel, Place) {

                function Route(tripId, tripDayId) {
                    DayExtensionModel.apply(this, [tripId, tripDayId]);
                    this.name = "route";
                    this.data = {
                        name: "",
                        from: null,
                        to: null,
                        avoids: {
                            highways: false,
                            tolls: false
                        }
                    };
                }


                Route.prototype = Object.create(DayExtensionModel.prototype);
                
                Route.prototype.setPlace = function(place, identifier){
                    this.data[identifier] = place;
                };

                return Route;

            }
        ]);