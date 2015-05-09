"use strict";
angular.module("tripPlanner.trip")
        .factory("tp.trip.TripCache", ["tp.tripDay.TripDayCache", "tp.core.CacheSPI",
            function TripCacheFactory(tripDayCache, Cache) {

                function TripCache() {
                    Cache.call(this);
                }

                TripCache.prototype = Object.create(Cache.prototype);
                TripCache.prototype.set = function (obj) {
                    if (obj !== null && typeof obj !== "undefined") {
                        this.cache = obj;
                        tripDayCache.set(obj.days, obj.id);
                    }
                };
                TripCache.prototype.reset = function () {
                    this.cache = null;
                    tripDayCache.reset();
                };


                TripCache.prototype.removeDayExtension = function (extensionId, dayId) {
                    var day = this.getDay(dayId);
                    if (!day) {
                        return;
                    }
                    for (var j = 0, maxj = day.data.length; j < maxj; j++) {
                        if (day.data[j].id === extensionId) {
                            day.data.splice(j, 1);
                            return;
                        }
                    }
                };


                TripCache.prototype.getDayExtension = function (extId) {
                    if (!this.cache) {
                        return null;
                    }

                    var result = null;
                    for (var i = 0, max = this.cache.days.length; i < max; i++) {
                        for (var j = 0, maxj = this.cache.days[i].data.length; j < maxj; j++) {
                            if (this.cache.days[i].data[j].id === extId) {
                                result = this.cache.days[i].data[j];
                            }
                        }
                    }
                    return result;
                };

                TripCache.prototype.getDay = function (dayId) {
                    if (!this.cache) {
                        return null;
                    }

                    var result = null;
                    for (var i = 0, max = this.cache.days.length; i < max; i++) {
                        if (this.cache.days[i].id === dayId) {
                            result = this.cache.days[i];
                        }
                    }
                    return result;
                };

                return new TripCache();
            }
        ]);