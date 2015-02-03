"use strict";

angular.module("tripPlanner.logger", [])
        .factory("tp.logger", ["$rootScope", function LoggerFactory($rootScope) {

                $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                    window.console.log(error);
                });

                return {
                    log: function (message, title, level) {
                        window.console.log(message);
                        $rootScope.$broadcast("log", message, title, level);
                    }
                };
            }]);