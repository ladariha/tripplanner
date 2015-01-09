"use strict";

angular.module("tripPlanner.core")
        .factory("tp.core.Server", [function() {
                function Server(endpoints, pattern) {
                    this.endpoints = endpoints;
                    window.console.log("server created");
                    this.preferredPattern = pattern;
                }

                Server.prototype._patterns = {};
                Server.prototype._patterns.php = function(endpoint, parameters) {
                    var url = "";
                    for (var parameter in parameters) {
                        if (parameters.hasOwnProperty(parameter)) {
                            url += "&" + parameter + "=" + encodeURIComponent(parameters[parameter]);
                        }
                    }
                    return (url.length > 1) ? this.endpoints[endpoint] + "?" + url : this.endpoints[endpoint];
                };

                Server.prototype._patterns.prettyUrl = function(endpoint, parameters) {
                    var url = "";
                    for (var parameter in parameters) {
                        if (parameters.hasOwnProperty(parameter)) {
                            url += "/" + encodeURIComponent(parameters[parameter]);
                        }
                    }
                    return this.endpoints[endpoint] + url;
                };

                Server.prototype.buildURL = function(endpoint, parameters) {
                    return this._patterns[this.preferredPattern].call(this, endpoint, parameters);
                };

                return Server;

            }]);