"use strict";

angular.module("tripPlanner.auth")
        .factory("tp.auth.LoginService",
                ["tp.session.Session", "tp.auth.AuthHttp", "tp.Core", "$interval",
                    function LoginService(session, authHttp, core, $interval) {

                        checkForSession();

                        var loginService = {
                            login: login,
                            logout: logout,
                            authProvider: null,
                            checkForSession: checkForSession
                        };

                        return loginService;


                        function login(serviceName) {
                            popupCenter(core.server.buildURL(serviceName + "Auth", []), 950, 700);
                            waitForResponse(serviceName);
                        }

                        function logout() {
                            authHttp.logout().then(function () {
                                session.removeUser();
                            }, function (data) {
                                window.console.error(data);
                            });
                        }

                        function checkForSession() {
                            authHttp.getSession().then(function (data) {
                                loginService.authProvider = data.hasOwnProperty("google") ? "google" : "facebook";
                                session.setUser(
                                        data[loginService.authProvider].email,
                                        data.id, data[loginService.authProvider].email,
                                        data[loginService.authProvider].displayName,
                                        data[loginService.authProvider].id,
                                        loginService.authProvider,
                                        data[loginService.authProvider].imageUrl,
                                        data.trips);
                            }, function () {
                                session.removeUser();
                            });
                        }

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
                                authHttp.getSession().then(function (data) {
                                    loginService.authProvider = data.hasOwnProperty("google") ? "google" : "facebook";
                                    session.setUser(
                                            data[loginService.authProvider].email,
                                            data.id, data[loginService.authProvider].email,
                                            data[loginService.authProvider].displayName,
                                            data[loginService.authProvider].id,
                                            loginService.authProvider,
                                            data[loginService.authProvider].imageUrl,
                                            data.trips);
                                    $interval.cancel(sessionChecking);
                                }, function () {
                                    session.removeUser();
                                });
                            }

                            var sessionChecking = $interval(doCheck, 1000);
                        }
                    }]);