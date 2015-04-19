"use strict";
angular.module("tripPlanner.extension.note")
        .directive("tpExtDay.note", ["tp.ext.ExtensionData", "tp.user.UserHandler", "tp.logger", function (extensionData, UserHandler, logger) {
                return {
                    restrict: "E",
                    scope: {
                        "extId": "@"
                    },
                    replace: true,
                    templateUrl: "js/ext_note/viewDirective.html",
                    controller: function ($scope) {
                        var ext = (extensionData.get($scope.extId));
                        var user = null;
                        $scope.text = ext.data;


                        function init() {
                            new UserHandler().getUser(ext.author).then(resolveAuthor, function (data, status) {
                                logger.log("Failed to get user " + status, "Problem", "INFO", "alert");
                            });
                        }

                        function resolveAuthor(u) {
                            user = u;
                            $scope.author = user.displayName;
                        }

                        init();

                    }
                };
            }]);
