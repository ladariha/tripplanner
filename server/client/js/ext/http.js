"use strict";
angular.module("tripPlanner.dayextension")
        .factory("tp.ext.ExtHttp", ["tp.Core", "$http", "$rootScope", "$q", function DayExtHttp(core, $http, $rootScope, $q) {


                function ExtHttp(name) {
                    this.name = name;
                }

                ExtHttp.prototype.create = function (ext) {
                    var deferred = $q.defer();

                    $http.post(core.server.buildURL(this.name, []), JSON.stringify(ext)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;
                };
                ExtHttp.prototype.edit = function(ext) {
                    var deferred = $q.defer();
                    $http.put(core.server.buildURL(this.name, [ext.id, ext.tripDayId]), JSON.stringify(ext)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                };

                ExtHttp.prototype.get = function (extId, dayId) {
                    var deferred = $q.defer();
                    $http.get(core.server.buildURL(this.name, [extId, dayId])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;
                };

                ExtHttp.prototype.remove = function (extId, dayId) {
                    var deferred = $q.defer();
                    $http.delete(core.server.buildURL(this.name, [extId, dayId])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                };

                return ExtHttp;
            }]);