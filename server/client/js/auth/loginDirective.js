"use strict";

angular.module("tripPlanner.auth").directive("tpLogin", ["tp.auth.LoginService", function (LoginService) {

        return {
            restrict: "E",
            scope: {
            },
            controller: function ($scope) {
                $scope.isLoggedIn = false;
                $scope.displayName = "Log in";
                $scope.login = function (serviceName) {
                    LoginService.login(serviceName);
                };

                $scope.logout = function () {
                    LoginService.logout();
                };
                
                $scope.toggle = function(){
                    $("#loginMenu").dropdown("toggle");
                };

                $scope.$on("userLoggedIn", function (evt, user) {
                    $scope.isLoggedIn = true;
                    $scope.userId = user.userId;
                    $scope.displayName = user.displayName;
                    $scope.$apply();
                });
                $scope.$on("userLoggedOut", function () {
                    $scope.isLoggedIn = false;
                    $scope.userId = -1;
                    $scope.displayName = "Log in";
                    $scope.$apply();
                });

            },
            templateUrl: "js/auth/loginDirective.html"
        };

    }]);