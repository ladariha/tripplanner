"use strict";

angular.module("tripPlanner.core", ["tripPlanner.utils", "tripPlanner.user"])
        .factory("tp.core.Cache", function () {

            var cache = {
                get: function (key) {
                    return JSON.parse(window.localStorage.getItem(key));
                },
                set: function (key, value) {
                    value = JSON.stringify(value);
                    window.localStorage.removeItem(key);
                    try {
                        window.localStorage.setItem(key, value);
                    } catch (e) {
                        window.localStorage.clear();
                        window.localStorage.setItem(key, value);

                    }
                },
                remove: function (key) {
                    window.localStorage.removeItem(key);
                },
                drop: function () {
                    window.localStorage.clear();
                }
            };

            return cache;
        });