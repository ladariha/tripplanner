"use strict";

angular.module("tripPlanner.core").directive("tpNotification", ["$rootScope", function ($rootScope) {

        return {
            restrict: "E",
            scope: {
            },
            controller: function ($scope) {
                $scope.display = false;

                $rootScope.$on("httpError", showHttpError);
                $rootScope.$on("log", showLogMessage);

                function showHttpError(evt, data, status) {
                    $scope.display = true;
                    $scope.message = data;
                    $scope.title = status;
                    $scope.level = "danger";
                }

                function showLogMessage(evt, message, title, level, style) {
                    $scope.display = true;
                    $scope.message = message;
                    $scope.title = title;
                    $scope.level = level;
                    $scope.style = style || "info";
                }


            },
            templateUrl: "js/core/notificationDirective.html"


        };

    }]);