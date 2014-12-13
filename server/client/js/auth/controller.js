"use strict";

angular.module("tripPlanner.auth")
        .controller("tp.auth.LoginCtrl", ["$scope", "tp.auth.LoginService",
            function LoginCtrl($scope, LoginService) {
                $scope.login = function (serviceName) {
                    LoginService.login(serviceName);
                };

            }]);


