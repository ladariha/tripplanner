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
                $scope.cancelEdit = cancelEdit;
                $scope.createTrip = createTrip;
                $scope.openDatePicker = openDatePicker;
                $scope.updateTrip = updateTrip;


                var tripHandler = new TripHandler();
                var exitParams = {"id": $scope.trip.id, noCache: true};
                var exitOptions = {reload: true};

                function createTrip() {
                    tripHandler.create($scope.trip).then(function (newTrip) {
                        $state.go("trip.view", {"id": newTrip.id});
                    }, $scope.handleGenericError);
                }

                function cancelEdit() {
                    $state.go("trip.view", exitParams, exitOptions);
                }

                function updateTrip() {
                    tripHandler.edit($scope.trip).then(function () {
                        $state.go("trip.view", exitParams, exitOptions);
                    }, $scope.handleGenericError);
                }

                function openDatePicker($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.openedDatePicker = true;
                }
            }])
        .controller("tp.trip.ViewTripCtrl", ["$scope", "trip", "tp.session.Session", "$state", "$stateParams", "tp.trip.TripHandler", "tp.logger", "tp.trip.TripModel","tp.tripDay.TripDayHandler",
            function ViewTripCtrl($scope, trip, session, $state, $stateParams, TripHandler, logger, TripModel, TripDayHandler) {

                $scope.trip = trip ? trip : new TripModel("km");

                if ($scope.trip.id === -1) {
                    $state.go("trip.new");
                    return;
                }

                $scope.buttons = [];
                $scope.deleteDay = deleteDay;
                $scope.deleteTrip = deleteTrip;
                $scope.openDay = openDay;
                $scope.hasPermission = false;

                $scope.$on("userLoggedIn", initPermissions);
                $scope.$on("userLoggedOut", initPermissions);

                function openDay(index) {

                }
                function deleteDay(index) {
                    $scope.choiceModal("Delete trip day?", "Do you really want to remve this day?")
                            .then(function () {
                                return new TripDayHandler().remove($scope.trip.days[index].id, $scope.trip.id);
                            })
                            .then(function () {
                                logger.log("Done", "Day has been removed", "success");
                                $scope.trip.days.splice(index,1);
                            }, function (data, status, headers, config) {
                                if (data) {
                                    $scope.handleGenericError(data, status, headers, config);
                                }
                            });
                }

                function initDaysControls() {
                    var buttons = [];
                    for (var i = 0, max = $scope.trip.days.length; i < max; i++) {
                        buttons[i] = false;
                    }
                    $scope.buttons = buttons;
                }

                function initPermissions() {
                    $scope.hasPermission = session.getUser() && trip && trip.owner === session.getUser().userId ? true : false;
                    $scope.editPermission = session.getUser() && trip && (trip.owner === session.getUser().userId || trip.editors.indexOf(session.getUser().userId) > -1)? true : false;
                    
                }

                function deleteTrip() {
                    $scope.choiceModal("Delete trip?", "Do you really want to remve this trip?")
                            .then(function () {
                                return new TripHandler().remove($scope.trip.id);
                            })
                            .then(function () {
                                logger.log("Done", "Trip has been removed", "success");
                                $state.go("home");
                            }, function (data, status, headers, config) {
                                if (data) {
                                    $scope.handleGenericError(data, status, headers, config);
                                }
                            });
                }

                initPermissions();
                initDaysControls();
            }]);


