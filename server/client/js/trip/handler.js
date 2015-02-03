"use strict";
angular.module("tripPlanner.trip")
        .factory("tp.trip.TripHandler", ["tp.trip.TripHttp", "tp.TimeDateConvertor", "tp.trip.TripCache", "tp.trip.TripModel", "tp.session.Session", "$q",
            function TripHandlerFactory(TripHttp, timeDateConvertor, tripCache, TripModel, session, $q) {

                function TripHandler() {
                }

                /**
                 * 
                 * @param {Trip} trip
                 * @returns {Promise}
                 */
                TripHandler.prototype.create = function (trip) {
                    trip.date = timeDateConvertor.localToUTCString(trip.localDate);
                    trip.owner = session.getUser().userId;
                    return TripHttp.create(trip);
                };

                TripHandler.prototype.remove = function (id) {
                    tripCache.reset();
                    return TripHttp.remove(id);
                };

                TripHandler.prototype.edit = function (trip) {
                    if(!(trip.localDate instanceof Date)){
                        trip.localDate = new Date().getFromInput(trip.localDate, " ");
                    }
                    trip.date = timeDateConvertor.localToUTCString(trip.localDate);
                    trip.owner = session.getUser().userId;
                    delete trip.days;
                    return TripHttp.edit(trip);
                };

                TripHandler.prototype.get = function (id, noCache) {

                    var deferred = $q.defer();
                    if (!noCache && tripCache.get() && tripCache.get().id === id) {
                        deferred.resolve(tripCache.get());
                    } else {
                        tripCache.reset();
                        TripHttp.get(id).then(function (data) {
                            var _t = new TripModel().convertFromServer(data);
                            tripCache.set(_t);
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