"use strict";

angular.module("tripPlanner.core").directive("tpNotification", [function () {

        return {
            restrict: "E",
            scope: {
            },
            controller: function ($scope) {
                $scope.display = false;

                $scope.$on("httpError", function (evt, data, status, headers, config) {
                    $scope.display = true;
                    $scope.message = data;
                    $scope.title = status;
                    $scope.level = "danger";
                });


            },
            templateUrl: "js/core/notification.html"


        };

    }]);