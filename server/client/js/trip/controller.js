"use strict";

angular.module("tripPlanner.trip")
        .controller("tp.trip.NewTripCtrl", ["$scope", "tp.trip.TripModel", "tp.trip.TripHandler", "$location", "tp.trip.TripCache",
            /**
             * 
             * @param {type} $scope
             * @param {mapProvider} mapProvider
             * @param {type} TripModel
             * @param {type} TripDay
             * @returns {undefined}
             */
            function NewTripCtrl($scope, TripModel, TripHandler, $location, TripCache) {
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
                        $location.path("trip/" + newTrip.id);
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
        .controller("tp.trip.ViewTripCtrl", ["$scope", "$routeParams", "tp.TimeDateConvertor", "trip",
            function TripCtrl($scope, $routeParams, TimeDateConvertor, trip) {
                $scope.trip = trip;
                $scope.trip.date = TimeDateConvertor.UTCToDate($scope.trip.date);
                $scope.tripId = $routeParams.id || -1;
            }]);


