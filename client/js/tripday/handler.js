"use strict";
angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayHandler", [
            "tp.tripDay.TripDayHttp", "tp.TimeDateConvertor", "tp.tripDay.TripDayCache", "tp.tripDay.TripDayModel", "tp.session.Session", "$q",
            function TripDayHandlerFactory(tripDayHttp, timeDateConvertor, TripDayCache, TripDayModel, session, $q) {

                function TripDayHandler() {
                }

                /**
                 * 
                 * @param {TripDay} tripDay
                 * @returns {Promise}
                 */
                TripDayHandler.prototype.create = function (tripDay) {
                    tripDay.date = timeDateConvertor.localToUTCString(tripDay.date);
                    TripDayCache.reset();
                    return tripDayHttp.create(tripDay);
                };

                TripDayHandler.prototype.remove = function (id, tripId) {
                    TripDayCache.reset();
                    return tripDayHttp.remove(id, tripId);
                };

                TripDayHandler.prototype.edit = function (tripDay) {
                    if (!(tripDay.date instanceof Date)) {
                        tripDay.date = new Date().getFromInput(tripDay.date);
                    }
                    tripDay.date = timeDateConvertor.localToUTCString(tripDay.date);
                    return tripDayHttp.edit(tripDay);
                };

                TripDayHandler.prototype.get = function (id, noCache) {

                    var deferred = $q.defer();
                    if (!noCache && TripDayCache.get() && TripDayCache.get().id === id) {
                        deferred.resolve(TripDayCache.get());
                    } else {
                        TripDayCache.reset();
                        tripDayHttp.get(id).then(function (data) {
                            var _t = new TripDayModel();
                            _t.convertFromServer(data);
                            TripDayCache.set(_t, _t.tripId);
                            deferred.resolve(_t);
                        }, function (err) {
                            deferred.reject(err);
                        });
                    }
                    return deferred.promise;
                };

                return TripDayHandler;

            }

        ]);