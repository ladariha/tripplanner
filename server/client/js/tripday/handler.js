"use strict";
angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayHandler", ["tp.tripDay.TripDayHttp", "tp.TimeDateConvertor", "tp.trip.TripCache", "tp.trip.TripModel", "tp.session.Session", "$q",
            function TripDayHandlerFactory(TripDayHttp, timeDateConvertor, TripCache, TripModel, session, $q) {

                function TripDayHandler() {
                }

                /**
                 * 
                 * @param {Trip} trip
                 * @returns {Promise}
                 */
                TripDayHandler.prototype.create = function (trip) {
                    trip.date = timeDateConvertor.localToUTCString(trip.date);
                    trip.owner = session.getUser().userId;
                    return TripDayHttp.create(trip);
                };

                TripDayHandler.prototype.remove = function (id, tripId) {
                    TripCache.reset();
                    return TripDayHttp.remove(id, tripId);
                };

                TripDayHandler.prototype.edit = function (trip) {
                    if(!(trip.date instanceof Date)){
                        trip.date = new Date().getFromInput(trip.date);
                    }
                    trip.date = timeDateConvertor.localToUTCString(trip.date);
                    trip.owner = session.getUser().userId;
                    return TripDayHttp.edit(trip);
                };

                TripDayHandler.prototype.get = function (id, noCache) {

                    var deferred = $q.defer();
                    if (!noCache && TripCache.get() && TripCache.get().id === id) {
                        deferred.resolve(TripCache.get());
                    } else {
                        TripCache.reset();
                        TripDayHttp.get(id).then(function (data) {
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