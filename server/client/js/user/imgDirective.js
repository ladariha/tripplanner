"use strict";
angular.module("tripPlanner.user")
        .directive("tpProfile", ["tp.user.UserHandler", "$timeout", function (UserHandler, $timeout) {

                return {
                    restrict: "E",
                    scope: {
                        userId: "=userId",
                        label: "=label"
                    },
                    controller: function ($scope) {

                        function loadUser(userId) {
                            UserHandler.getUser(userId).then(function (user) {
                                $scope.user = user;
                            }, function (err) {
                                window.console.error(err);
                            });
                        }

                        $scope.$watch("userId", function (newValue, oldValue) {
                            if (newValue) {
                                loadUser(newValue);
                            }
                        }, true);

                        $scope.getUser = function () {
                            if ($scope.userId) {
                                loadUser($scope.userId);
                            }
                        };

                        $scope.getUser();
                    },
                    templateUrl: "js/user/imgDirective.html"
                };
            }]);