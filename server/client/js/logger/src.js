"use strict";

angular.module("tripPlanner.logger", [])
        .factory("tp.logger", ["$rootScope", function LoggerFactory($rootScope) {

                $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
                    window.console.error(error);
                    window.console.error(toState);
                    window.console.error(fromState);
                    window.console.error(toParams);
                    window.console.error(fromParams);
                });

                return {
                    log: function (message, title, level, style) {
                        window.console.log(message);
                        $rootScope.$emit("log", message, title, level, style);
                    }
                };
            }]);