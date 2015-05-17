"use strict";

angular.module("tripPlanner.tripDay")
        .controller("tp.tripDay.TripDayFormCtrl",
                ["$scope", "tp.trip.TripModel", "tp.tripDay.TripDayModel", "tp.tripDay.TripDayHandler", "$state", "tripDay", "trip",
                    /**
                     * 
                     * @param {type} $scope
                     * @param {type} TripModel
                     * @param {type} TripDayModel
                     * @param {TripDayHandler} TripDayHandler
                     * @param {type} $state
                     * @param {type} tripDay
                     * @param {type} trip
                     * @returns {undefined}
                     */
                    function TripDayFormCtrl($scope, TripModel, TripDayModel, TripDayHandler, $state, tripDay, trip) {
                        $scope.trip = trip;
                        $scope.tripDay = tripDay || new TripDayModel($scope.trip.id);
                        $scope.openedDatePicker = false;
                        $scope.cancel = cancel;
                        $scope.createDay = createDay;
                        $scope.openDatePicker = openDatePicker;
                        $scope.updateDay = updateDay;

                        var exitParams = {"id": $scope.trip.id, noCache: true};
                        var exitOptions = {reload: true};
                        var tripDayHandler = new TripDayHandler();

                        function createDay() {
                            tripDayHandler.create($scope.tripDay).then(function () {
                                $state.go("trip.view", {"id": $scope.trip.id, "noCache" : true});
                            }, $scope.handleGenericError);
                        }

                        function cancel() {
                            $state.go("trip.view", exitParams, exitOptions);
                        }

                        function updateDay() {
                            tripDayHandler.edit($scope.tripDay).then(function () {
                                $state.go("trip.view", exitParams, exitOptions);
                            }, $scope.handleGenericError);
                        }

                        function openDatePicker($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            $scope.openedDatePicker = true;
                        }
                    }])
        .controller("tp.tripDay.ViewTripDayCtrl", ["$scope", "tripDay", "trip", "tp.tripDay.TripDayModel", "tp.session.Session", "tp.logger",
            function ViewTripDayCtrl($scope, tripDay, trip, TripDayModel, session, logger) {
                $scope.tripDay = tripDay || new TripDayModel(-1);
                $scope.hasPermission = false;

                function initPermissions() {
                    $scope.hasPermission = session.getUser() && tripDay && trip && (trip.owner === session.getUser().userId || trip.editors.indexOf(session.getUser().userId) > -1) ? true : false;
                }

                function init() {
                    if (typeof trip === "undefined") {// on entering URL directly or page reload
                        logger.log("","Cannot create/update day of unknown trip", "INFO", "warning");
                    }
                }

                initPermissions();
                init();
            }]);


