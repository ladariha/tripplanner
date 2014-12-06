"use strict";

angular.module("tripPlanner.session", [])
        .factory("tp.session.Session", ["tp.user.UserModel", "$http", function (User, $http) {

                function Session() {
                    window.console.log("new session");
                    this.user = null;
                    this.sessionId = -1;
                    this.created = null;

                }

                Session.prototype.getUser = function () {
                    return this.user;
                };

                Session.prototype.setUser = function (username, userId, email, displayName, ssoId, ssoName, profileImgUrl) {
                    this.user = new User();
                    this.user.username = username;
                    this.user.userId = userId;
                    this.user.email = email;
                    this.user.displayName = displayName;
                    this.user.ssoName = ssoName;
                    this.user.ssoId = ssoId;
                    this.user.profileImgUrl = profileImgUrl;
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