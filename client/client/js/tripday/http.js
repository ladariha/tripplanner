"use strict";
angular.module("tripPlanner.tripDay.http", ["tripPlanner.core"])
        .factory("tp.tripDay.http.TripDayHttp", ["tp.Core", "$http", "$rootScope", function(core, $http, $rootScope) {


                function TripDayHttp() {
                }
                TripDayHttp.prototype.create = function(tripDay) {
                    return new Promise(function(resolve, reject) {
                        $http.post(core.server.buildURL("tripDay", {}), JSON.stringify(tripDay)).success(function(result) {
                            resolve(result);
                        }).error(function(data, status, headers, config) {
                            $rootScope.$broadcast("httpError", data, status, headers, config);
                            reject(data, status, headers, config);
                        });
                    });
                };

                return new TripDayHttp();
            }]);