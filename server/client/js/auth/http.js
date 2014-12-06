"use strict";
angular.module("tripPlanner.auth")
        .factory("tp.auth.AuthHttp", ["tp.Core", "$http", "$rootScope", function (core, $http, $rootScope) {

                var AuthHttp = {
                    getSession: function () {
                        return new Promise(function (resolve, reject) {
                            $http.get(core.server.buildURL("session", {})).success(function (result) {
                                resolve(result);
                            }).error(function (data, status, headers, config) {
                              //  $rootScope.$broadcast("httpError", data, status, headers, config);
                                reject(data, status, headers, config);
                            });
                        });
                    },
                    logout: function () {
                        return new Promise(function (resolve, reject) {
                            $http.delete(core.server.buildURL("session", {})).success(function (result) {
                                resolve(result);
                            }).error(function (data, status, headers, config) {
                                $rootScope.$broadcast("httpError", data, status, headers, config);
                                reject(data, status, headers, config);
                            });
                        });
                    }
                };

                return AuthHttp;
            }]);