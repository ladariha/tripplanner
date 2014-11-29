"use strict";

angular.module("tripPlanner.auth", []).factory("tp.auth.LoginService", ["tp.auth.Profile", "tp.core.Session", "$rootScope", function (Profile, Session, $rootScope) {

        (function initAuth() {
            hello.init({
                google: "1005520707529-tpb3ajv7plllarh40ber2qi52t8bca4q.apps.googleusercontent.com",
                facebook: "667832393333965"
            }, {redirect_uri: "http://localhost:8383/TripPlanner/redirect.html", scope: "email"});
        })();

//      store session tokens
        var tokens = {
            "google": null
        };

        var LoginService = {
            login: function (serviceName) {
                hello(serviceName).login().then(function () {
                    LoginService.authProvider = serviceName;
                    tokens[serviceName] = hello(serviceName).getAuthResponse().access_token;
                }, function (err) {
                    window.console.error(err);
                });
            },
            logout: function () {
                hello(this.authProvider).logout().then(function () {
                    $rootScope.$broadcast("userLoggedOut");
                    Session.removeUser();
                }, function (err) {
                    window.console.error(err);
                });
            },
            authProvider: null
        };

        hello.on("auth.login", function (r) {
            LoginService.authProvider = r.network;
            Profile.setAuthProvider(r.network);
            hello(LoginService.authProvider).api("me").then(function (profile) {
                Session.setUser(Profile.getUsername(profile), Profile.getUserId(profile), Profile.getEmail(profile), Profile.getDisplayName(profile));
                $rootScope.$broadcast("userLoggedIn", Session.getUser());
            }, function (err) {
                window.console.error(err);
            });
        });

        return LoginService;

    }]).factory("tp.auth.Profile", [function () {

        var googleFormatter = {
            getDisplayName: function (me) {
                return me.displayName;
            },
            getEmail: function (me) {
                return me.email;
            },
            getUserId: function (me) {
                return me.id;
            },
            getUsername: function (me) {
                return me.email;
            }
        };
        var facebookFormatter = {
            getDisplayName: function (me) {
                return me.name;
            },
            getEmail: function (me) {
                return me.email;
            },
            getUserId: function (me) {
                return me.id;
            },
            getUsername: function (me) {
                return me.email;
            }
        };

        var formatters = {
            "google": googleFormatter,
            "facebook" : facebookFormatter
        };

        var Profile = {
            authProvider: null,
            setAuthProvider: function (providerName) {
                this.authProvider = providerName;
            },
            getDisplayName: function (me) {
                return formatters[this.authProvider].getDisplayName(me);
            },
            getEmail: function (me) {
                return formatters[this.authProvider].getEmail(me);
            },
            getUserId: function (me) {
                return formatters[this.authProvider].getUserId(me);
            },
            getUsername: function (me) {
                return formatters[this.authProvider].getUsername(me);
            }
        };

        return Profile;

    }]);