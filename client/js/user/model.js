"use strict";

angular.module("tripPlanner.user")
        .factory("tp.user.UserModel", [function UserModel() {
                function User(username, email, userId, ssoId, ssoName, profileImageUrl) {
                    this.username = username;
                    this.displayName = "";
                    this.email = email;
                    this.userId = userId;
                    this.ssoId = ssoId;
                    this.ssoName = ssoName;
                    this.profileImgUrl = profileImageUrl;
                    this.trips = [];
                }

                User.prototype.convertFromServer = function (data) {
                    var serviceName = data.hasOwnProperty("google") ? "google" : "facebook";
                    this.username = data[serviceName].email;
                    this.userId = data.id;
                    this.email = data[serviceName].email;
                    this.displayName = data[serviceName].displayName;
                    this.ssoName = serviceName;
                    this.ssoId = data[serviceName].id;
                    this.profileImgUrl = data[serviceName].imageUrl;
                    this.trips = data.trips;
                    return this;
                };

                return User;
            }]);
