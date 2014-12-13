"use strict";
angular.module("tripPlanner.trip", ["tripPlanner.tripDay", "tripPlanner.core", "tripPlanner.utils", "tripPlanner.session"])
        .factory("tp.trip.TripHandler", ["tp.trip.TripHttp", "tp.TimeDateConvertor", "tp.trip.TripCache", "tp.trip.TripModel", "tp.session.Session", "$q",
            function (TripHttp, TimeDateConvertor, TripCache, TripModel, Session, $q) {

                function TripHandler() {
                }

                /**
                 * 
                 * @param {Trip} trip
                 * @returns {Promise}
                 */
                TripHandler.prototype.createTrip = function (trip) {
                    trip.date = TimeDateConvertor.localToUTCString(trip.date);
                    trip.owner = Session.getUser().userId;
                    return TripHttp.create(trip);
                };

                TripHandler.prototype.get = function (id) {

                    var deferred = $q.defer();
                    if (TripCache.get() && TripCache.get().id === id) {
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