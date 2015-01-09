"use strict";

angular.module("tripPlanner.session", [])
        .factory("tp.session.Session", ["tp.user.UserModel", "$http", "$rootScope", "$timeout", function (User, $http, $rootScope, $timeout) {

                function Session() {
                    window.console.log("new session");
                    this.user = null;
                    this.created = null;

                }

                Session.prototype.getUser = function () {
                    return this.user;
                };

                Session.prototype.setUser = function (username, userId, email, displayName, ssoId, ssoName, profileImgUrl, trips) {
                    this.user = new User();
                    this.user.username = username;
                    this.user.userId = userId;
                    this.user.email = email;
                    this.user.displayName = displayName;
                    this.user.ssoName = ssoName;
                    this.user.ssoId = ssoId;
                    this.user.profileImgUrl = profileImgUrl;
                    this.user.trips = trips;
                    this.created = new Date();
                    $http.defaults.headers.common["X-TripPlanner-Created"] = this.created;
                    $http.defaults.headers.common["X-TripPlanner-UserId"] = this.user.userId;
                    var self = this;
                    $timeout(function () {
                        $rootScope.$broadcast("userLoggedIn", self.user);
                    });
                };

                Session.prototype.removeUser = function () {
                    this.user = null;
                    this.created = null;
                    delete $http.defaults.headers.common["X-TripPlanner-Created"];
                    delete $http.defaults.headers.common["X-TripPlanner-UserId"];

                    $timeout(function () {
                        $rootScope.$broadcast("userLoggedOut");
                    });
                };

                return new Session();

            }]);