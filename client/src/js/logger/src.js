"use strict";

angular.module("tripPlanner.logger", [])
        .factory("tp.logger", [function() {

                function Logger() {
                    window.console.log("new logger");
                }

                Logger.prototype.log = function(logLevel, msg) {
                    window.console.log(msg);
                };
                return new Logger();
            }]);