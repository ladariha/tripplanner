"use strict";
angular.module("tripPlanner.extension.route")
        .factory("tp.ext.route.RouteModel", ["tp.ext.TripDayExtModel", "tp.validators","tp.core.lzw",
            function RouteModel(DayExtensionModel, rules, lzw) {

                function Route(tripId, tripDayId) {
                    DayExtensionModel.apply(this, [tripId, tripDayId]);
                    this.name = "route";
                    this.data = {
                        name: "",
                        from: null,
                        to: null,
                        waypoints: [],
                        duration : 0,
                        distance : 0,
                        routeName : null,
                        avoids: {
                            highways: false,
                            tolls: false
                        },
                        rawData : {
                            direction : null,
                            steps : null
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
                            rules.definedNotNull(this.data.distance) &&
                            rules.definedNotNull(this.data.routeName) &&
                            rules.definedNotNull(this.data.duration) &&
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
                
                
                Route.prototype.convertFromServer = function (obj) {
                    DayExtensionModel.prototype.convertFromServer.apply(this, [obj]);
                    this.data.rawData.steps = lzw.decompress(this.data.rawData.steps);
                    
                    
                    return this;
                };
                
                

                return Route;

            }
        ]);