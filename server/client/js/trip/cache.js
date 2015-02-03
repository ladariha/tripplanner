"use strict";
angular.module("tripPlanner.trip")
        .factory("tp.trip.TripCache", [ "tp.tripDay.TripDayCache",
            function TripCache(tripDayCache) {

                var cachedTrip = null;
                var tripCache = {
                    get: function () {
                        return cachedTrip;
                    },
                    set: function (trip) {
                        if (trip !== null && typeof trip !== "undefined") {
                            cachedTrip = trip;
                            tripDayCache.set(trip.days, trip.id);
                        }
                    },
                    reset: function () {
                        cachedTrip = null;
                        tripDayCache.reset();
                    }
                };
                return tripCache;
            }
        ]);