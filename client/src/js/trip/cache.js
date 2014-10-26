"use strict";
angular.module("tripPlanner.trip")
        .factory("tp.trip.TripCache", [
            function () {

                var cachedTrip = null;
                var tripCache = {
                    get: function () {
                        return cachedTrip;
                    },
                    set: function (trip) {
                        if (trip !== null && typeof trip !== "undefined") {
                            cachedTrip = trip;
                        }
                    },
                    reset: function () {
                        cachedTrip = null;
                    }
                };
                return tripCache;
            }
        ]);