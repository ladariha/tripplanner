"use strict";

angular.module("tripPlanner.user", ["tripPlanner.utils"])
        .factory("tp.user.UserModel", [function() {
                function User(username, email, userId) {
                    this.username = username;
                    this.displayName = "";
                    this.email = email;
                    this.userId = userId;
                }
                return User;
            }]);
