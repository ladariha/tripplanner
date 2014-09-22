"use strict";

/* Controllers */

angular.module("tripPlanner.controllers",
        ["tripPlanner.map.handlers", "tripPlanner.trip.models", "tripPlanner.trip.handlers", "tripPlanner.user.models", "tripPlanner.core", "tripPlanner.logger"])
        .controller("TripPlannerCtrl", ["$scope", "tp.logger", "tp.core.Session", "tp.user.models.UserModel", function TripPlannerCtrl($scope, logger, sessionFct, User) {

                sessionFct.setUser(new User("lada", "lada@lada", 1), 1);
                $scope.currentUser = sessionFct.getUser().username;

                $scope.debug = false;
                $scope.preferredMapProvider = "google";

                $scope.$on("busyMode", function (event, args) {
                    if (args) {
                        window.document.body.style.cursor = "wait";
                    } else {
                        window.document.body.style.cursor = "default";
                    }
                });

                $scope.handleGenericError = function (msg) {
                    logger.log("Action failed", msg, "INFO", "alert-error");
                };

                $scope.ngRefresh = function () {
                    if (!$scope.$$phase) {
                        $scope.$digest();
                    }
                };

            }])
        .controller("HomeCtrl", ["$scope", function HomeCtrl($scope) {
                $scope.test = 1;
            }])
        .controller("NewTripCtrl", ["$scope", "tp.trip.models.TripModel", "tp.trip.handlers.TripHandler", "$location",
            /**
             * 
             * @param {type} $scope
             * @param {mapProvider} mapProvider
             * @param {type} TripModel
             * @param {type} TripDay
             * @returns {undefined}
             */
            function NewTripCtrl($scope, TripModel, TripHandler, $location) {
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
        .controller("TripCtrl", ["$scope", "tp.trip.models.TripModel", "tp.trip.handlers.TripHandler", "$location",
            /**
             * 
             * @param {type} $scope
             * @param {mapProvider} mapProvider
             * @param {type} TripModel
             * @param {type} TripDay
             * @returns {undefined}
             */
            function TripCtrl($scope, TripModel, TripHandler, $location) {
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
        .controller("NewTripDayCtrl", ["$scope", "tp.map.MapProvider", "tp.trip.models.TripModel", "tp.tripDay.models.TripDayModel", "tp.trip.handlers.TripHandler", "tp.core.Session",
            /**
             * 
             * @param {type} $scope
             * @param {mapProvider} mapProvider
             * @param {type} Trip
             * @param {type} TripDay
             * @returns {undefined}
             */
            function NewTripDayCtrl($scope, mapProvider, Trip, TripDay, TripHandler, se) {

                $scope.currentStep = "step1";
                /** @type MapProvider */
                var map = mapProvider.getMapProvider($scope.preferredMapProvider);
                /**
                 * 
                 * @type TripModel
                 */
                $scope.trip = null;
                $scope.directions = [];
                $scope.selectedDirection = 0;
                var rawDirectionResult = null;
                $scope.openedDatePicker = false;


                function init() {
                    var _t = new Trip("km");
                    _t.tripDays.push(new TripDay({"highways": false, "tolls": false}));
                    $scope.trip = _t;
                }

                function placeSelected(place, identifier) {
                    $scope.trip.tripDays[0].setPlace(place, identifier);
                    $scope.ngRefresh();
                }

                $scope.back = function () {
                    $scope.currentStep = "step1";
                };

                $scope.tripIsValid = function () {
                    return $scope.debug || $scope.trip.isValid();
                };

                $scope.createTrip = function () {
                    $scope.directions = [];
                    if ($scope.debug) {
                        $scope.trip.tripDays[0].setPlace(map.mocks.places[0], "from");
                        $scope.trip.tripDays[0].setPlace(map.mocks.places[1], "to");
                    }

                    $scope.currentStep = "step2";

                    if ($scope.debug) {
                        map.getDebugDirections(displayDirections);
                    } else {
                        map.getSimpleDirections($scope.trip.tripDays[0].from, $scope.trip.tripDays[0].to, $scope.trip.units, $scope.trip.tripDays[0].avoids, displayDirections);
                    }

                };
                function displayDirections(err, data) {
                    if (err) {
                        window.console.error(err);
                        return;
                    }

                    $scope.directions = data.routes;
                    rawDirectionResult = data;
                    $scope.selectDirection(0);
                    $scope.ngRefresh();
                }

                $scope.selectDirection = function (index) {
                    $scope.selectedDirection = index;
                    map.displayRoute(rawDirectionResult, "tripPreview", index, "directions-panel");
                    $scope.ngRefresh();
                };

                $scope.openDatePicker = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.openedDatePicker = true;
                };

                $scope.create = function () {
                    $scope.trip.tripDays[0].rawRouteData = map.getFinalRouteObject(rawDirectionResult, $scope.selectedDirection);
                    $scope.trip.tripDays[0].distance = map.getDistance($scope.trip.tripDays[0].rawRouteData, 0);
                    $scope.trip.tripDays[0].duration = map.getDuration($scope.trip.tripDays[0].rawRouteData, 0);
                    new TripHandler().createTrip($scope.trip).then(function (e) {
                        window.console.log("trip created " + e);
                    }, function (msg) {
                        $scope.handleGenericError(msg);
                    });
                };

                init();

            }]);



