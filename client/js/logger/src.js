"use strict";

angular.module("tripPlanner.logger")
        .factory("tp.logger", ["$rootScope", function LoggerFactory($rootScope) {

                var logger = {
                    log: log,
                    logHttp: logHttp,
                    logStateChangeError: logStateChangeError
                };

                $rootScope.$on("$stateChangeError", logStateChangeError);

                return logger;



                function log(message, title, level, style) {
                    window.console.log(message);
                    $rootScope.$emit("log", message, title, level, style);
                }

                function logHttp(msg) {
                    logger.log("Action failed", msg, "INFO", "danger");
                }

                function logStateChangeError(event, toState, toParams, fromState, fromParams, error) {
                    window.console.error(error);
                    window.console.error(toState);
                    window.console.error(fromState);
                    window.console.error(toParams);
                    window.console.error(fromParams);
                }

            }]);