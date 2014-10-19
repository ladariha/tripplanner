"use strict";

angular.module("tripPlanner.core", ["tripPlanner.utils", "tripPlanner.user"])
        .factory("tp.core.Cache", function() {

            function Cache() {
                this.defaultCookiesExpiration = 12 * 60 * 60 * 1000;
            }

            Cache.prototype.setCookie = function(key, value) {
                var date = new Date();
                date.setTime(date.getTime() + (this.defaultCookiesExpiration));
                var expires = "; expires=" + date.toGMTString();
                window.document.cookie = key + "=" + value + expires + "; path=/";
            };
            Cache.prototype.removeCookie = function(key) {
                window.document.cookie = key + "=;; path=/";
            };

            Cache.prototype.getCookie = function(key) {
                key += "=";
                var ca = window.document.cookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === " "){
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(key) === 0) {
                        return c.substring(key.length, c.length);
                    }
                }
            };

            Cache.prototype.get = function(key) {
                if (window.localStorage) {
                    return JSON.parse(window.localStorage.getItem(key));
                }
                return null;
            };
            Cache.prototype.set = function(key, value) {
                if (window.localStorage) {
                    window.localStorage.removeItem(key);
                    try {
                        window.localStorage.setItem(key, JSON.stringify(value));
                    } catch (e) {
                        if (e.code === 22 || e.code === 21 || e.code === 20) {
                            this.drop();
                            window.localStorage.setItem(key, JSON.stringify(value));
                        }
                    }
                }
            };
            Cache.prototype.remove = function(key) {
                if (window.localStorage) {
                    window.localStorage.removeItem(key);
                }
            };

            Cache.prototype.drop = function() {
                for (var i = 0, max = window.localStorage.length; i < max; i++) {
                    window.localStorage.removeItem(window.localStorage.key(0));
                }
            };

            return Cache;
        });