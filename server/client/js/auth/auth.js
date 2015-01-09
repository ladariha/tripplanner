"use strict";

angular.module("tripPlanner.auth", ["tripPlanner.core", "tripPlanner.session"])
        .factory("tp.auth.LoginService",
                ["tp.session.Session", "tp.auth.AuthHttp", "tp.Core", "$interval",
                    function (Session, AuthHttp, Core, $interval) {

                        function popupCenter(url, w, h) {
                            var dualScreenLeft = typeof window.screenLeft !== "undefined" ? window.screenLeft : window.screen.left;
                            var dualScreenTop = typeof window.screenTop !== "undefined" ? window.screenTop : window.screen.top;

                            var width = window.innerWidth ? window.innerWidth : window.document.documentElement.clientWidth ? window.document.documentElement.clientWidth : window.screen.width;
                            var height = window.innerHeight ? window.innerHeight : window.document.documentElement.clientHeight ? window.document.documentElement.clientHeight : window.screen.height;
                            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
                            var top = ((height / 2) - (h / 2)) + dualScreenTop;
                            var newWindow = window.open(url, "", "scrollbars=yes, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
                            if (window.focus) {
                                newWindow.focus();
                            }
                        }

                        function waitForResponse() {

                            function doCheck() {
                                AuthHttp.getSession().then(function (data) {
                                    LoginService.authProvider = data.hasOwnProperty("google") ? "google" : "facebook";
                                    Session.setUser(
                                            data[LoginService.authProvider].email,
                                            data.id, data[LoginService.authProvider].email,
                                            data[LoginService.authProvider].displayName,
                                            data[LoginService.authProvider].id,
                                            LoginService.authProvider,
                                            data[LoginService.authProvider].imageUrl,
                                            data.trips);
                                    $interval.cancel(sessionChecking);
                                }, function () {
                                    Session.removeUser();
                                });
                            }

                            var sessionChecking = $interval(doCheck, 1000);
                        }


                        var LoginService = {
                            login: function (serviceName) {
                                popupCenter(Core.server.buildURL(serviceName + "Auth", {}), 950, 700);
                                waitForResponse(serviceName);
                            },
                            logout: function () {
                                AuthHttp.logout().then(function () {
                                    Session.removeUser();
                                }, function (data) {
                                    window.console.error(data);
                                });
                            },
                            authProvider: null,
                            checkForSession: function () {
                                AuthHttp.getSession().then(function (data) {
                                    LoginService.authProvider = data.hasOwnProperty("google") ? "google" : "facebook";
                                    Session.setUser(
                                            data[LoginService.authProvider].email,
                                            data.id, data[LoginService.authProvider].email,
                                            data[LoginService.authProvider].displayName,
                                            data[LoginService.authProvider].id,
                                            LoginService.authProvider,
                                            data[LoginService.authProvider].imageUrl,
                                            data.trips);
                                }, function () {
                                    Session.removeUser();
                                });
                            }
                        };

                        LoginService.checkForSession();

                        return LoginService;

                    }]);