"use strict";
angular.module("tripPlanner.extension.note")
        .factory("tp.ext.note.NoteHttp", ["tp.Core", "$http", "$rootScope", "$q", function NoteHttp(core, $http, $rootScope, $q) {

                var httpService = {
                    create: create,
                    edit: edit,
                    get: get,
                    remove: remove
                };

                return httpService;


                function create(note) {
                    var deferred = $q.defer();

                    $http.post(core.server.buildURL("note", []), JSON.stringify(note)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$emit("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;
                }

                function edit(note) {
                    var deferred = $q.defer();
                    $http.put(core.server.buildURL("note", [note.id, note.tripDayId]), JSON.stringify(note)).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                }

                function get(noteId, dayId) {
                    var deferred = $q.defer();
                    $http.get(core.server.buildURL("note", [noteId, dayId])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });

                    return deferred.promise;
                }

                function remove(noteId, dayId) {
                    var deferred = $q.defer();
                    $http.delete(core.server.buildURL("note", [noteId, dayId])).success(function (result) {
                        deferred.resolve(result);
                    }).error(function (data, status, headers, config) {
                        $rootScope.$broadcast("httpError", data, status, headers, config);
                        deferred.reject(data, status, headers, config);
                    });
                    return deferred.promise;
                }


            }]);