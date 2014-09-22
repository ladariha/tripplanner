"use strict";
angular.module("tripPlanner.trip.handlers", ["tripPlanner.trip.http", "tripPlanner.tripDay.http"])
        .factory("tp.trip.handlers.TripHandler", ["tp.trip.http.TripHttp", "tp.tripDay.http.TripDayHttp",
            function(tripHttp, tripDayHttp) {

                function TripHandler() {
                }

                /**
                 * 
                 * @param {Trip} trip
                 * @returns {Promise}
                 */
                TripHandler.prototype.createTrip = function(trip) {
                    return tripHttp.create(trip);
                };


                return TripHandler;

            }

        ]);