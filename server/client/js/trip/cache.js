"use strict";
angular.module("tripPlanner.trip")
        .factory("tp.trip.TripCache", ["tp.tripDay.TripDayCache", "tp.core.CacheSpi",
            function TripCacheFactory(tripDayCache, Cache) {

                function TripCache() {
                    Cache.call(this);
                }

                TripCache.prototype = Object.create(Cache.prototype);
                TripCache.prototype.get = function (obj) {
                    if (obj !== null && typeof obj !== "undefined") {
                        this.cache = obj;
                        tripDayCache.set(obj.days, obj.id);
                    }
                };
                TripCache.prototype.reset = function () {
                    this.cache = null;
                    tripDayCache.reset();
                };

                return new TripCache();
            }
        ]);