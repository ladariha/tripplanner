"use strict";

angular.module("tripPlanner.trip")
        .controller("tp.trip.NewTripCtrl", ["$scope", "tp.trip.TripModel", "tp.trip.TripHandler", "$state", "tp.trip.TripCache",
            /**
             * 
             * @param {type} $scope
             * @param {mapProvider} mapProvider
             * @param {type} TripModel
             * @param {type} TripDay
             * @returns {undefined}
             */
            function NewTripCtrl($scope, TripModel, TripHandler, $state, TripCache) {
                $scope.trip = null;
                $scope.openedDatePicker = false;

                function init() {
                    $scope.trip = new TripModel("km");
                }

                $scope.tripIsValid = function () {
                    return $scope.debug || $scope.trip.isValid();
                };

                $scope.createTrip = function () {
                    new TripHandler().createTrip($scope.trip).then(function (newTrip) {
                        TripCache.set(newTrip);
                        $state.go("trip", {"id": "5496ae936953b2ed221d55c7"});
                    }, function (msg) {
                        $scope.handleGenericError(msg);
                    });
                };

                $scope.openDatePicker = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.openedDatePicker = true;
                };

                init();

            }])
        .controller("tp.trip.ViewTripCtrl", ["$scope", "trip",
            function ViewTripCtrl($scope, trip) {
                $scope.trip = trip;
                $scope.tripId = trip.id || -1;
            }]);


