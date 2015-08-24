"use strict";

angular.module("tripPlanner.core")
        .factory("tp.core.Storage", function Storage() {

            var storage = {
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

            return storage;
        });