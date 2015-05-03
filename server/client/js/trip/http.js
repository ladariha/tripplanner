"use strict";
angular.module("tripPlanner.trip")
        .factory("tp.trip.TripHttp", ["tp.Core", "$http", "$rootScope", "$q", function TripHttp(core, $http, $rootScope, $q) {

                var httpService = {
                    create: create,
                    edit: edit,
                    get: get,
                    remove: remove
                };

                return httpService;


                function create(trip) {
                    var deferred = $q.defer();

                    $http.post(core.server.buildURL("trip", []), JSON.stringify(trip)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;
                }

                function edit(trip) {
                    var deferred = $q.defer();
                    $http.put(core.server.buildURL("trip", [trip.id]), JSON.stringify(trip)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;
                }

                function get(tripId) {
                    var deferred = $q.defer();
                    $http.get(core.server.buildURL("trip", [tripId])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;
                }

                function remove(tripId) {
                    var deferred = $q.defer();
                    $http.delete(core.server.buildURL("trip", [tripId])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                }


            }]);