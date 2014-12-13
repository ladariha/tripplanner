"use strict";
angular.module("tripPlanner.trip")
        .factory("tp.trip.TripHttp", ["tp.Core", "$http", "$rootScope", "$q", function (core, $http, $rootScope, $q) {


                function TripHttp() {
                }
                TripHttp.prototype.create = function (trip) {
                    var deferred = $q.defer();

                    $http.post(core.server.buildURL("trip", {}), JSON.stringify(trip)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;
                };
                TripHttp.prototype.get = function (tripId) {
                    var deferred = $q.defer();
                    $http.get(core.server.buildURL("trip", {"id": tripId})).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;

                };

                return new TripHttp();
            }]);