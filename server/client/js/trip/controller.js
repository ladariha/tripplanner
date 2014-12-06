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
                    }).then(function () {
                        $scope.$apply();
                    });
                };

                $scope.openDatePicker = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.openedDatePicker = true;
                };

                init();

            }])
        .controller("tp.trip.ViewTripCtrl", ["$scope", "tp.trip.TripHandler", "$routeParams", "tp.TimeDateConvertor",
            function TripCtrl($scope, TripHandler, $routeParams, TimeDateConvertor) {
                $scope.trip = null;
                $scope.tripId = $routeParams.id || -1;

                function init() {
                    new TripHandler().get($scope.tripId).then(function (data) {
                        $scope.trip = data;
                        $scope.trip.date = TimeDateConvertor.UTCToDate($scope.trip.date);
                    }).then(function () {
                        $scope.$apply();
                    });
                }

                init();

            }]);


