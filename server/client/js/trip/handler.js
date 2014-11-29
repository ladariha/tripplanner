"use strict";
angular.module("tripPlanner.trip", ["tripPlanner.tripDay", "tripPlanner.core", "tripPlanner.utils"])
        .factory("tp.trip.TripHandler", ["tp.trip.TripHttp", "tp.TimeDateConvertor",
            function(tripHttp, TimeDateConvertor) {

                function TripHandler() {
                }

                /**
                 * 
                 * @param {Trip} trip
                 * @returns {Promise}
                 */
                TripHandler.prototype.createTrip = function(trip) {
                    trip.date = TimeDateConvertor.localToUTCString(trip.date);
                    return tripHttp.create(trip);
                };


                return TripHandler;

            }

        ]);