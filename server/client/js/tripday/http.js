"use strict";
angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayHttp", ["tp.Core", "$http", "$rootScope", "$q", function TripDayHttp(core, $http, $rootScope, $q) {


                var httpService = {
                    create: create
                };
                return httpService;

                function create(tripDay) {
                    var deferred = $q.defer();
                    $http.post(core.server.buildURL("tripDay", {}), JSON.stringify(tripDay)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                }
            }]);