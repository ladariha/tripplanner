"use strict";
angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayHttp", ["tp.Core", "$http", "$rootScope", "$q", function TripDayHttp(core, $http, $rootScope, $q) {


                var httpService = {
                    create: create,
                    remove: remove,
                    get: get,
                    edit: edit
                };
                return httpService;

                function get(tripDayId) {
                    var deferred = $q.defer();

                    $http.get(core.server.buildURL("tripDay", [tripDayId])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;
                }

                function edit(tripDay) {
                    var deferred = $q.defer();
                    $http.put(core.server.buildURL("tripDay", [tripDay.id]), JSON.stringify(tripDay)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                }

                function create(tripDay) {
                    var deferred = $q.defer();
                    $http.post(core.server.buildURL("tripDay", []), JSON.stringify(tripDay)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                }

                function remove(tripDayId, tripId) {
                    var deferred = $q.defer();
                    $http.delete(core.server.buildURL("tripDay", [tripDayId, tripId])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                }


            }]);