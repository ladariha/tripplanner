"use strict";
angular.module("tripPlanner.tripDay", ["tripPlanner.core", "tripPlanner.utils", "tripPlanner.place"])
        .factory("tp.tripDay.TripDayHttp", ["tp.Core", "$http", "$rootScope", "$q", function (core, $http, $rootScope, $q) {


                function TripDayHttp() {
                }
                TripDayHttp.prototype.create = function (tripDay) {
                    var deferred = $q.defer();
                    $http.post(core.server.buildURL("tripDay", {}), JSON.stringify(tripDay)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                };

                return new TripDayHttp();
            }]);