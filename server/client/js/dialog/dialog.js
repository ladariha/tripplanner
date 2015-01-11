"use strict";

angular.module("tripPlanner.dialog", [])
        .directive("tpInfodialog", [function () {
                return {
                    restrict: "E",
                    scope: {
                        body: "=",
                        title: "=",
                        visible: "="
                    },
                    controller: function ($scope) {

                        $scope.$watch("visible", function (value) {
                            if (value) {
                                $("#tpModalInfo").modal();
                            } else {
                                $("#tpModalInfo").modal("hide");
                            }
                        });

                        $scope.close = function () {
                            $scope.visible = false;
                        };

                    },
                    templateUrl: "js/dialog/infoDialogDirective.html"
                };

            }])
        .directive("tpChoicedialog", [function () {
                return {
                    restrict: "E",
                    scope: {
                        body: "=",
                        title: "=",
                        visible: "=",
                        resolve: "&",
                        reject: "&"
                    },
                    controller: function ($scope) {
                        $scope.$watch("visible", function (value) {
                            if (value) {
                                $("#tpModalChoice").modal();
                            } else {
                                $("#tpModalChoice").modal("hide");
                            }
                        });

                        $scope.next = function (val) {
                            $scope.visible = false;
                            if (val) {
                                $scope.$evalAsync($scope.resolve);
                            } else {
                                $scope.$evalAsync($scope.reject);
                            }
                        };


                    },
                    templateUrl: "js/dialog/choiceDialogDirective.html"
                };

            }]);