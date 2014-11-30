"use strict";
angular.module("tripPlanner.user")
        .factory("tp.user.UserHttp", ["tp.Core", "$http", "$rootScope", function (core, $http, $rootScope) {


                function UserHttp() {
                }

                UserHttp.prototype.get = function (userId) {
                    return new Promise(function (resolve, reject) {
                        $http.get(core.server.buildURL("user", {"id": userId})).success(function (result) {
                            resolve(result);
                        }).error(function (data, status, headers, config) {
                            $rootScope.$broadcast("httpError", data, status, headers, config);
                            reject(data, status, headers, config);
                        });
                    });
                };

                return new UserHttp();
            }]);