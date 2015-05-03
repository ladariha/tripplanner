"use strict";
angular.module("tripPlanner.auth")
        .factory("tp.auth.AuthHttp", ["tp.Core", "$http", "$rootScope", "$q", function (core, $http, $rootScope, $q) {

                var httpService = {
                    getSession: getSession,
                    logout: logout
                };

                return httpService;

                function getSession() {
                    var deferred = $q.defer();

                    $http.get(core.server.buildURL("session", [])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        //  $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                }

                function logout() {
                    var deferred = $q.defer();
                    $http.delete(core.server.buildURL("session", [])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                }

            }]);