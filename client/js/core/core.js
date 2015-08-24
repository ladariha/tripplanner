"use strict";

angular.module("tripPlanner.core")
        .service("tp.Core", ["tp.core.Server", function Core(Server) {
                this.version = "0.1";
                this.hostname = window.location.hostname;
                this.server = new Server({
                    "trip": "http://localhost:13131/api/trip",
                    "tripDay": "http://localhost:13131/api/tripDay",
                    "session": "http://localhost:13131/api/session",
                    "googleAuth" : "http://localhost:13131/api/oauth/google",
                    "facebookAuth" : "http://localhost:13131/api/oauth/facebook",
                    "user" : "http://localhost:13131/api/user"
                }, "prettyUrl");
            }]);