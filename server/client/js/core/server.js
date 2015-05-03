"use strict";

angular.module("tripPlanner.core")
        .factory("tp.core.Server", [function ServerFactory() {
                function Server(endpoints, pattern) {
                    this.endpoints = endpoints;
                    window.console.log("server created");
                    this.preferredPattern = pattern;
                }

                Server.prototype._patterns = {};
                Server.prototype._patterns.php = function (endpoint, parameters) {
                    var url = "";
                    for (var parameter in parameters) {
                        if (parameters.hasOwnProperty(parameter)) {
                            url += "&" + parameter + "=" + encodeURIComponent(parameters[parameter]);
                        }
                    }
                    return (url.length > 1) ? this.endpoints[endpoint] + "?" + url : this.endpoints[endpoint];
                };

                Server.prototype._patterns.prettyUrl = function (endpoint, parameters) {
                    if (!(parameters instanceof Array)) {
                        throw new Error("wrong parameter type")
                    }
                    var url = "";
                    for (var i = 0, max = parameters.length; i < max; i++) {
                            url += "/" + encodeURIComponent(parameters[i]);
                    }
                    return this.endpoints[endpoint] + url;
                };

                Server.prototype.buildURL = function (endpoint, parameters) {
                    return this._patterns[this.preferredPattern].call(this, endpoint, parameters);
                };
                Server.prototype.addUrl = function (key, value) {
                    if (!this.endpoints.hasOwnProperty(key)) {
                        this.endpoints[key] = value;
                    }
                };

                return Server;

            }]);