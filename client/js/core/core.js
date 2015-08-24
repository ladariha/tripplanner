"use strict";

angular.module("tripPlanner.core")
        .service("tp.Core", ["tp.core.Server", function Core(Server) {
                this.version = "0.1";
                this.hostname = window.location.hostname;
                this.server = new Server({
                    "trip": "api/trip",
                    "tripDay": "api/tripDay",
                    "session": "api/session",
                    "googleAuth" : "api/oauth/google",
                    "facebookAuth" : "api/oauth/facebook",
                    "user" : "api/user"
                }, "prettyUrl");
            }]);