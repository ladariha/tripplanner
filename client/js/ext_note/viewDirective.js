"use strict";
angular.module("tripPlanner.extension.note")
        .directive("tpExtDay.note", [
            "tp.user.UserHandler",
            "tp.logger",
            "$rootScope",
            "tp.trip.TripHandler",
            "tp.trip.TripCache",
            "tp.ext.note.NoteHandler",
            function (UserHandler, logger, $rootScope, TripHandler, tripCache, NoteHandler) {
                return {
                    restrict: "E",
                    scope: {
                        "extId": "@",
                        "editPermissions": "@"
                    },
                    replace: true,
                    templateUrl: "js/ext_note/viewDirective.html",
                    controller: function ($scope) {

                        var ext = tripCache.getDayExtension($scope.extId);
                        var user = null;
                        var tripHandler = new TripHandler();
                        var day = tripCache.getDay(ext.tripDayId);

                        $scope.text = ext.data;
                        $scope.canEdit = false;
                        $scope.buttons = false;
                        $scope.dayName = day.name;
                        $scope.tripId = tripCache.get().id;
                        $scope.dayId = day.id;
                        $scope.displayConfirmation = displayConfirmation;
                        $scope.choiceMsg = "Do you really want to remove this note?";
                        $scope.choiceTitle = "Delete note?";
                        $scope.choiceVisible = false;
                        $scope.dialogResolve = dialogResolve;
                        $rootScope.$on("userLoggedIn", initPermissions);
                        $rootScope.$on("userLoggedOut", initPermissions);


                        function dialogResolve(confirmed) {
                            $scope.choiceVisible = false;
                            if (confirmed) {
                                new NoteHandler().remove($scope.extId, $scope.dayId).then(function () {}, function (err) {
                                    logger.log("Failed to remove note" + err, "Problem", "INFO", "alert");
                                });
                            }
                        }

                        function displayConfirmation() {
                            $scope.choiceVisible = true;
                        }

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
