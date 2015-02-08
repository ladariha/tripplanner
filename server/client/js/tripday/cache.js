"use strict";
angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayCache", ["tp.core.CacheSpi",
            function TripDayCacheFactory(Cache) {

                function TripDayCache() {
                    Cache.call(this);
                    this.cachedTripId = -1;

                }

                TripDayCache.prototype = Object.create(Cache.prototype);
                TripDayCache.prototype.get = function (tripId) {
                    return this.cachedTripId === tripId ? this.cache : this.reset();
                };

                TripDayCache.prototype.set = function (days, tripId) {
                    if (days !== null && typeof days !== "undefined") {
                        this.cachedTripId = tripId;
                        this.cache = days;
                    }
                };

                TripDayCache.prototype.reset = function () {
                    this.cache = null;
                    this.cachedTripId = -1;
                    return null;
                };

                return new TripDayCache();
            }
        ]);