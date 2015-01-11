"use strict";

angular.module("tripPlanner.logger", [])
        .factory("tp.logger", ["$rootScope", function ($rootScope) {

                $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                    window.console.log(error);
                });

                function Logger() {
                    window.console.log("new logger");
                }

                Logger.prototype.log = function (message, title, level) {
                    window.console.log(message);
                    $rootScope.$broadcast("log", message, title, level);
                };
                return new Logger();
            }]);