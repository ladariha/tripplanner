"use strict";

angular.module("tripPlanner.auth").directive("tpLogin", ["tp.auth.LoginService", "$rootScope", function (LoginService, $rootScope) {

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

                $scope.toggle = function () {
                    $("#loginMenu").dropdown("toggle");
                };

                function userChanged(evt, user) {
                    if (evt.name === "userLoggedIn") {
                        $scope.isLoggedIn = true;
                        $scope.userId = user.userId;
                        $scope.displayName = user.displayName;
                    } else {
                        $scope.isLoggedIn = false;
                        $scope.userId = -1;
                        $scope.displayName = "Log in";
                    }
                    $scope.$apply();
                }

                $rootScope.$on("userLoggedIn", userChanged);
                $rootScope.$on("userLoggedOut", userChanged);

            },
            templateUrl: "js/auth/loginDirective.html"
        };

    }]);