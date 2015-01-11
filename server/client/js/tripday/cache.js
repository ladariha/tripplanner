"use strict";
angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayCache", [
            function () {
                var cachedTripId = -1;
                var cachedDays = null;
                var tripDayCache = {
                    get: function (tripId) {
                        return cachedTripId === tripId ? cachedDays : tripDayCache.reset();
                    },
                    set: function (days, tripId) {
                        if (days !== null && typeof days !== "undefined") {
                            cachedTripId = tripId;
                            cachedDays = days;
                        }
                    },
                    reset: function () {
                        cachedDays = null;
                        cachedTripId = -1;
                        return null;
                    }
                };
                return tripDayCache;
            }
        ]);