"use strict";

angular.module("tripPlanner.core", ["tripPlanner.utils", "tripPlanner.user"])
        .factory("tp.core.Cache", function () {

            var cache = {
                get: function (key) {
                    if (window.localStorage) {
                        return JSON.parse(window.localStorage.getItem(key));
                    }
                    return null;
                },
                set: function (key, value) {
                    if (window.localStorage) {

                        value = JSON.stringify(value);
                        window.localStorage.removeItem(key);
                        try {
                            window.localStorage.setItem(key, value);
                        } catch (e) {
                            if (e.code >= 20 && e.code <= 22) {
                                this.drop();
                                window.localStorage.setItem(key, value);
                            }
                        }
                    }
                },
                remove: function (key) {
                    if (window.localStorage) {
                        window.localStorage.removeItem(key);
                    }
                },
                drop: function () {
                    for (var i = 0, max = window.localStorage.length; i < max; i++) {
                        window.localStorage.removeItem(window.localStorage.key(0));
                    }
                }
            };

            return cache;
        });