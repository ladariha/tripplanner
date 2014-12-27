"use strict";
angular.module("tripPlanner.trip", ["tripPlanner.tripDay", "tripPlanner.core", "tripPlanner.utils", "tripPlanner.session", "tripPlanner.logger"])
        .factory("tp.trip.TripHandler", ["tp.trip.TripHttp", "tp.TimeDateConvertor", "tp.trip.TripCache", "tp.trip.TripModel", "tp.session.Session", "$q",
            function (TripHttp, TimeDateConvertor, TripCache, TripModel, Session, $q) {

                function TripHandler() {
                }

                /**
                 * 
                 * @param {Trip} trip
                 * @returns {Promise}
                 */
                TripHandler.prototype.create = function (trip) {
                    trip.date = TimeDateConvertor.localToUTCString(trip.date);
                    trip.owner = Session.getUser().userId;
                    return TripHttp.create(trip);
                };

                TripHandler.prototype.remove = function (id) {
                    TripCache.reset();
                    return TripHttp.remove(id);
                };

                TripHandler.prototype.edit = function (trip) {
                    if(!(trip.date instanceof Date)){
                        trip.date = new Date().getFromInput(trip.date);
                    }
                    trip.date = TimeDateConvertor.localToUTCString(trip.date);
                    trip.owner = Session.getUser().userId;
                    return TripHttp.edit(trip);
                };

                TripHandler.prototype.get = function (id, noCache) {

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

                return TripHandler;

            }

        ]);