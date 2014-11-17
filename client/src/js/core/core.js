"use strict";

angular.module("tripPlanner.core")
        .service("tp.Core", ["tp.core.Server", "tp.core.Session", function (Server, session) {
                this.version = "0.1";
                this.hostname = window.location.hostname;
                this.server = new Server({
                    "trip": "http://localhost:13131/api/trip",
                    "tripDay": "http://localhost:13131/api/tripDay"
                }, "php");
                this.session = session;
            }])
        .factory("tp.core.Session", ["tp.user.UserModel", "$http", function (User, $http) {

                function Session() {
                    window.console.log("new session");
                    this.user = null;
                    this.sessionId = -1;
                    this.created = null;

                }

                Session.prototype.getUser = function () {
                    return this.user;
                };

                Session.prototype.setUser = function (username, userId, email, displayName) {
                    this.user = new User();
                    this.user.username = username;
                    this.user.userId = userId;
                    this.user.email = email;
                    this.user.displayName = displayName;
                    this.sessionId = -1;
                    this.created = new Date();
                    $http.defaults.headers.common["X-TripPlanner-SessionId"] = -1;
                    $http.defaults.headers.common["X-TripPlanner-Created"] = this.created;
                    $http.defaults.headers.common["X-TripPlanner-UserId"] = this.user.userId;
                };

                Session.prototype.removeUser = function () {
                    this.user = null;
                    this.sessionId = -1;
                    this.created = null;
                    delete $http.defaults.headers.common["X-TripPlanner-SessionId"];
                    delete $http.defaults.headers.common["X-TripPlanner-Created"];
                    delete $http.defaults.headers.common["X-TripPlanner-UserId"];
                };

                return new Session();

            }]);


