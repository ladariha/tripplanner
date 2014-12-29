"use strict";

angular.module("tripPlanner.trip")
        .controller("tp.trip.TripFormCtrl", ["$scope", "tp.trip.TripModel", "tp.trip.TripHandler", "$state", "trip","tp.TimeDateConvertor",
            /**
             * 
             * @param {type} $scope
             * @param {mapProvider} mapProvider
             * @param {type} TripModel
             * @param {type} TripDay
             * @returns {undefined}
             */
            function TripFormCtrl($scope, TripModel, TripHandler, $state, trip, TimeDateConvertor) {
                $scope.trip = trip ? trip : new TripModel("km");
                $scope.openedDatePicker = false;
                var tripHandler = new TripHandler();


                if($scope.trip.id !== -1){
                    // convert UTC string to local Date
                    $scope.trip.date = TimeDateConvertor.UTCToDate($scope.trip.date).toPrettyString("-", true);
                }


                $scope.tripIsValid = function () {
                    return $scope.debug || $scope.trip.isValid();
                };

                $scope.createTrip = function () {
                    tripHandler.create($scope.trip).then(function (newTrip) {
                        $state.go("trip.view", {"id": newTrip.id});
                    }, function (msg) {
                        $scope.handleGenericError(msg);
                    });
                };

                $scope.cancelEdit = function () {
                    $state.go("trip.view", {"id": $scope.trip.id, noCache: true}, {reload: true});
                };

                $scope.updateTrip = function () {
                    tripHandler.edit($scope.trip).then(function () {
                        $state.go("trip.view", {"id": $scope.trip.id, noCache: true}, {reload: true});
                    }, function (msg) {
                        $scope.handleGenericError(msg);
                    });
                };

                $scope.openDatePicker = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.openedDatePicker = true;
                };


            }])
        .controller("tp.trip.ViewTripCtrl", ["$scope", "trip", "tp.session.Session", "$state", "$stateParams", "tp.trip.TripHandler", "tp.logger",
            function ViewTripCtrl($scope, trip, Session, $state, $stateParams, TripHandler, Logger) {

                $scope.trip = trip;
                $scope.tripId = trip ? trip.id : -1;

                $scope.$on("userLoggedIn", function (evt, user) {
                    initPermissions();
                });
                $scope.$on("userLoggedOut", function () {
                    initPermissions();
                });

                function initPermissions() {
                    $scope.hasPermission = Session.getUser() && trip ? trip.owner === Session.getUser().userId : false;
                }

                $scope.editTrip = function () {
                    $state.go("trip.edit", {noCache: true}, {reload: true});
                };

                $scope.deleteTrip = function () {
                    new TripHandler().remove($scope.trip.id).then(function () {
                        Logger.log("Done", "Trip has been removed", "success");
                        $state.go("home");
                    }, function (msg) {
                        $scope.handleGenericError(msg);
                    });
                };

                initPermissions();

            }]);


