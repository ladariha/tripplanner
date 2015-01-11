"use strict";
angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayHandler", ["tp.trip.TripHttp", "tp.TimeDateConvertor", "tp.trip.TripCache", "tp.trip.TripModel", "tp.session.Session", "$q",
            function (TripHttp, TimeDateConvertor, TripCache, TripModel, Session, $q) {

                function TripDayHandler() {
                }

                /**
                 * 
                 * @param {Trip} trip
                 * @returns {Promise}
                 */
                TripDayHandler.prototype.create = function (trip) {
                    trip.date = TimeDateConvertor.localToUTCString(trip.date);
                    trip.owner = Session.getUser().userId;
                    return TripHttp.create(trip);
                };

                TripDayHandler.prototype.remove = function (id) {
                    TripCache.reset();
                    return TripHttp.remove(id);
                };

                TripDayHandler.prototype.edit = function (trip) {
                    if(!(trip.date instanceof Date)){
                        trip.date = new Date().getFromInput(trip.date);
                    }
                    trip.date = TimeDateConvertor.localToUTCString(trip.date);
                    trip.owner = Session.getUser().userId;
                    return TripHttp.edit(trip);
                };

                TripDayHandler.prototype.get = function (id, noCache) {

                    var deferred = $q.defer();
                    if (!noCache && TripCache.get() && TripCache.get().id === id) {
                        deferred.resolve(TripCache.get());
                    } else {
                        TripCache.reset();
                        TripHttp.get(id).then(function (data) {
                            var _t = new TripModel();
                            _t.convertFromServer(data);
                            TripCache.set(_t);
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