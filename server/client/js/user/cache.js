"use strict";
angular.module("tripPlanner.user")
        .factory("tp.user.UserCache", [
            function () {

                var cachedUsers = [];
                var userCache = {
                    get: function (userId) {
                        return cachedUsers[userId];
                    },
                    set: function (user) {
                        if (user !== null && typeof user !== "undefined") {
                            cachedUsers[user.userId] = user;
                        }
                    },
                    reset: function () {
                        cachedUsers = [];
                    }
                };
                return userCache;
            }
        ]);