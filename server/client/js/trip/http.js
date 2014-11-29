"use strict";
angular.module("tripPlanner.trip")
        .factory("tp.trip.TripHttp", ["tp.Core", "$http", "$rootScope", function(core, $http, $rootScope) {


                function TripHttp() {
                }
                TripHttp.prototype.create = function(trip) {
                    return new Promise(function(resolve, reject) {
                        $http.post(core.server.buildURL("trip", {}), JSON.stringify(trip)).success(function(result) {
                            resolve(result);
                        }).error(function(data, status, headers, config) {
                            $rootScope.$broadcast("httpError", data, status, headers, config);
                            reject(data, status, headers, config);
                        });
                    });
                };
                TripHttp.prototype.get = function(tripId) {
                    return new Promise(function(resolve, reject) {
                        $http.get(core.server.buildURL("trip", {"id" : tripId})).success(function(result) {
                            resolve(result);
                        }).error(function(data, status, headers, config) {
                            $rootScope.$broadcast("httpError", data, status, headers, config);
                            reject(data, status, headers, config);
                        });
                    });
                };

                return new TripHttp();
            }]);