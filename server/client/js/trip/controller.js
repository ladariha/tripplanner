"use strict";

angular.module("tripPlanner.trip")
        .controller("tp.trip.TripFormCtrl", ["$scope", "tp.trip.TripModel", "tp.trip.TripHandler", "$state", "trip",
            /**
             * 
             * @param {type} $scope
             * @param {mapProvider} mapProvider
             * @param {type} TripModel
             * @param {type} TripDay
             * @returns {undefined}
             */
            function TripFormCtrl($scope, TripModel, TripHandler, $state, trip) {

                $scope.trip = trip ? trip : new TripModel("km");
                $scope.openedDatePicker = false;

                var tripHandler = new TripHandler();
                var exitParams = {"id": $scope.trip.id, noCache: true};
                var exitOptions = {reload: true};

                $scope.createTrip = function () {
                    tripHandler.create($scope.trip).then(function (newTrip) {
                        $state.go("trip.view", {"id": newTrip.id});
                    }, $scope.handleGenericError);
                };

                $scope.cancelEdit = function () {
                    $state.go("trip.view", exitParams, exitOptions);
                };

                $scope.updateTrip = function () {
                    tripHandler.edit($scope.trip).then(function () {
                        $state.go("trip.view", exitParams, exitOptions);
                    }, $scope.handleGenericError);
                };

                $scope.openDatePicker = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.openedDatePicker = true;
                };


            }])
        .controller("tp.trip.ViewTripCtrl", ["$scope", "trip", "tp.session.Session", "$state", "$stateParams", "tp.trip.TripHandler", "tp.logger", "tp.trip.TripModel",
            function ViewTripCtrl($scope, trip, Session, $state, $stateParams, TripHandler, Logger, TripModel) {

                $scope.trip = trip ? trip : new TripModel("km");
                $scope.buttons = [];

                $scope.$on("userLoggedIn", function () {
                    initPermissions();
                });
                $scope.$on("userLoggedOut", function () {
                    initPermissions();
                });

                function initDaysControls() {
                    var buttons = [];
                    for (var i = 0, max = $scope.trip.days.length; i < max; i++) {
                        buttons[i] = false;
                    }
                    $scope.buttons = buttons;
                }

                function initPermissions() {
                    $scope.hasPermission = Session.getUser() && trip && trip.owner === Session.getUser().userId ? true : false;
                }

                $scope.openDay = function (index) {

                };

                $scope.deleteDay = function (index) {

                };

                $scope.deleteTrip = function () {
                    $scope.choiceModal("Delete trip?", "Do you really want to remve this trip?")
                            .then(function () {
                                return new TripHandler().remove($scope.trip.id);
                            })
                            .then(function () {
                                Logger.log("Done", "Trip has been removed", "success");
                                $state.go("home");
                            }, function (data, status, headers, config) {
                                if (data) {
                                    $scope.handleGenericError(data, status, headers, config);
                                }
                            });
                };

                initPermissions();
                initDaysControls();
            }]);


