"use strict";

angular.module("tripPlanner.user.models", ["tripPlanner.utils"])
        .factory("tp.user.models.UserModel", [function() {
                function User(username, email, userId) {
                    this.username = username;
                    this.email = email;
                    this.userId = userId;
                }
                return User;
            }]);
