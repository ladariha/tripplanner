"use strict";

angular.module("tripPlanner.auth").directive("tpLogin", ["tp.auth.LoginService", function (LoginService) {

        return {
            restrict: "E",
            scope: {
            },
            controller: function ($scope) {
                $scope.isLoggedIn = false;

                $scope.login = function (serviceName) {
                    LoginService.login(serviceName);
                };

                $scope.logout = function () {
                    LoginService.logout();
                };

                $scope.$on("userLoggedIn", function (evt, user) {
                    $scope.isLoggedIn = true;
                    $scope.displayName = user.displayName;
                    $scope.$apply();
                });
                $scope.$on("userLoggedOut", function () {
                    $scope.isLoggedIn = false;
                    $scope.displayName = null;
                    $scope.$apply();
                });

            },
            templateUrl: "js/auth/loginDirective.html"


        };

    }]);