"use strict";
angular.module("tripPlanner.user")
        .factory("tp.user.UserHttp", ["tp.Core", "$http", "$rootScope", "$q", function (core, $http, $rootScope, $q) {


                function UserHttp() {
                }

                UserHttp.prototype.get = function (userId) {
                    var deferred = $q.defer();
                    $http.get(core.server.buildURL("user", {"id": userId})).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                };

                return new UserHttp();
            }]);