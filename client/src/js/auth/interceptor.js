"use strict";

angular.module("tripPlanner.auth").factory("tp.auth.HttpInterceptor", ["tp.core.Session", "$rootScope", "tp.auth.Profile", "tp.auth.LoginService","$q","$injector",
    function (Session, $rootScope, Profile, LoginService, $q, $injector) {

        var IGNORE_URLS = ["ignoreURL"];
        var refreshPromise = null;

        function SessionRenewal() {
            this.originalResponse = null;
            this.intervalId = -1;
            this.TOKEN_LENGTH = 32;
            this.token = null;
            this.counter = 0;
        }


        SessionRenewal.prototype.getToken = function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < this.TOKEN_LENGTH; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text + new Date().getTime();
        };

        SessionRenewal.prototype.reset = function () {
            window.clearInterval(this.intervalId);
            this.counter = 0;
            this.token = null;
            this.intervalId = -1;
            this.originalResponse = null;
        };

        SessionRenewal.prototype.checkForNewLogin = function () {
            this.counter++;
        };


        SessionRenewal.prototype.init = function (response) {
            refreshPromise = $q.defer();

            this.originalResponse = response;
            $("#tpModaTitle").text("Please login");
            $("#tpModalBody").html("You need to login to complete");
            if (!$("#tpModal").hasClass("in")) {
                $("#tpModal").modal("toggle");
            }
            var self = this;
            this.intervalId = window.setInterval(function () {
                self.checkForNewLogin();
            }, 2000);

            return refreshPromise.promise;
        };

        SessionRenewal.prototype.displayDialog = function () {
            if ($("#tpModal").hasClass("in")) {
                $("#tpModal").modal("toggle");
            }
        };

        SessionRenewal.prototype.renew = function (response) {
            var self = this;
            return this.init(response).then(function () {
                return hello(LoginService.authProvider).api("me");
            }).then(function (profile) {
                Session.setUser(Profile.getUsername(profile), Profile.getUserId(profile), Profile.getEmail(profile), Profile.getDisplayName(profile));
                $rootScope.$broadcast("userLoggedIn", Session.getUser());
                self.displayDialog(false);
                var $h = $injector.get("$http");
                return $h(response.config);
            }).then(function (data) {
                window.console.log(data);

            }, function () {
                Session.removeUser();
                return $q.reject(response);
            });
        };


        var sessionRenewal = new SessionRenewal();

        return function (promise) {
            return promise.then(function (response) {
                window.console.log("response1");
                window.console.log(response);
                return response;
            }, function (response) {

                if (parseInt(response.status, 10) === 401 && IGNORE_URLS.indexOf(response.config.url) < 0) { // expired session
                    return sessionRenewal.renew(response);
                } else {
                    return $q.reject(response);
                }
            });
        };

    }]);