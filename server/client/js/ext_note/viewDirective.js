"use strict";
angular.module("tripPlanner.extension.note")
        .directive("tpExtDay.note", [
            "tp.ext.ExtensionData",
            "tp.user.UserHandler",
            "tp.logger",
            "$rootScope",
            "tp.session.Session",
            "tp.trip.TripHandler",
            function (extensionData, UserHandler, logger, $rootScope, session, TripHandler) {
                return {
                    restrict: "E",
                    scope: {
                        "extId": "@",
                        "editPermissions": "@"
                    },
                    replace: true,
                    templateUrl: "js/ext_note/viewDirective.html",
                    controller: function ($scope) {
                        var ext = (extensionData.get($scope.extId));
                        var user = null;
                        var tripHandler = new TripHandler();

                        $scope.text = ext.data;
                        $scope.canEdit = false;
                        $scope.buttons = false;
                        $rootScope.$on("userLoggedIn", initPermissions);
                        $rootScope.$on("userLoggedOut", initPermissions);

                        function init() {
                            new UserHandler().getUser(ext.author).then(resolveAuthor, function (data, status) {
                                logger.log("Failed to get user " + status, "Problem", "INFO", "alert");
                            });
                            initPermissions();
                        }

                        function resolveAuthor(u) {
                            user = u;
                            $scope.author = user.displayName;
                        }

                        function initPermissions() {
                            $scope.canEdit = tripHandler.getEditPermissions(ext.tripId);
                        }

                        init();

                    }
                };
            }]);
