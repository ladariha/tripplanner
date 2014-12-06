"use strict";
angular.module("tripPlanner.trip", ["tripPlanner.tripDay", "tripPlanner.core", "tripPlanner.utils", "tripPlanner.session"])
        .factory("tp.trip.TripHandler", ["tp.trip.TripHttp", "tp.TimeDateConvertor", "tp.trip.TripCache", "tp.trip.TripModel", "tp.session.Session",
            function (TripHttp, TimeDateConvertor, TripCache, TripModel, Session) {

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
                    return new Promise(function (resolve, reject) {
                        if (TripCache.get() && TripCache.get().id === id) {
                            resolve(TripCache.get());
                        } else {
                            TripCache.reset();
                            return TripHttp.get(id).then(function (data) {
                                var _t = new TripModel();
                                _t.convertFromServer(data);
                                TripCache.set(_t);
                                resolve(_t);
                            }, function (err) {
                                reject(err);
                            });
                        }
                    });
                };

                return TripHandler;

            }

        ]);