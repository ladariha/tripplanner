"use strict";
angular.module("tripPlanner.extension.route")
        .controller("tp.ext.route.RouteCtrl", [
            "$scope", "$stateParams", "$state", "tp.ext.route.RouteHandler", "tp.ext.route.RouteModel", "tp.map.MapProvider", "tp.trip.TripCache",
            function RouteCtrl($scope, $stateParams, $state, RouteHandler, Route, mapProvider, tripCache) {
                var tripDay = $stateParams.tripDay;
                var routeHandler = new RouteHandler();
                var map = mapProvider.getDefaultProvider();
                var rawDirectionResult = null;
                var units = tripCache.get().units;

                $scope.isEdit = false;
                $scope.dayName = tripDay.name;
                $scope.localDate = tripDay.localDate.toPrettyString();
                $scope.route = new Route(tripDay.tripId, tripDay.id);
                $scope.find = find;
                $scope.removeWaypoint = removeWaypoint;
                $scope.moveWaypoint = moveWaypoint;
                $scope.create = create;
                $scope.cancel = cancel;
                $scope.foundRoutes = false;
                $scope.directions = [];
                $scope.selectDirection = selectDirection;
                $scope.selectedDirection = -1;


                function placeSelected(place, identifier) {
                    console.log(place);
                    $scope.route.setPlace(place, identifier);
                    if (identifier === "waypoint") {
                        document.getElementById("waypoint-input").value = "";
                    }
                    $scope.ngRefresh();
                }

                function selectDirection(index) {
                    $scope.selectedDirection = index;
                    map.displayRoute(rawDirectionResult, "tripPreview", index, "directions-panel");
                }


                function moveWaypoint(id, direction) {
                    var fromIndex;
                    for (var i = 0, max = $scope.route.data.waypoints.length; i < max; i++) {
                        if ($scope.route.data.waypoints[i].id === id) {
                            $scope.route.data.waypoints.move(fromIndex, fromIndex + direction);
                            return;
                        }
                    }
                }

                function find() {
                    map.getDirections($scope.route.data.from, $scope.route.data.to, units, $scope.route.data.avoids, $scope.route.data.waypoints).then(function (data) {
                        $scope.foundRoutes = true;
                        $scope.directions = data.routes;
                        rawDirectionResult = data;
                    }, function (err) {
                        console.log(err);
                    });
                }


                function removeWaypoint(id) {
                    for (var i = 0, max = $scope.route.data.waypoints.length; i < max; i++) {
                        if ($scope.route.data.waypoints[i].id === id) {
                            $scope.route.data.waypoints.splice(i, 1);
                            return;
                        }
                    }
                }

                function init() {
                    map.bindAutocomplete(window.document.getElementById("from-input"), placeSelected, "from");
                    map.bindAutocomplete(window.document.getElementById("to-input"), placeSelected, "to");
                    map.bindAutocomplete(window.document.getElementById("waypoint-input"), placeSelected, "waypoint");
                }



                function create() {
                    routeHandler.create($scope.route).then(function () {
                        $state.go("trip.view", {"id": tripDay.tripId, noCache: false}, {reload: true});
                    }, $scope.handleGenericError);
                }

                function cancel() {
                    $state.go("trip.view", {"id": tripDay.tripId, noCache: false}, {reload: true});
                }

                init();

            }
        ])
        .controller("tp.ext.route.RouteEditCtrl", [
            "$scope", "$stateParams", "$state", "tp.ext.route.RouteHandler", "tp.ext.route.RouteModel", "textAngularManager", "$timeout",
            function RouteEditCtrl($scope, $stateParams, $state, RouteHandler, Route, textAngularManager, $timeout) {

                $scope.dayName = $stateParams.dayName;
                $scope.route = new Route($stateParams.tripId, $stateParams.dayId);
                $scope.update = update;
                $scope.cancel = cancel;
                $scope.isEdit = true;

                var routeId = $stateParams.id;
                var routeHandler = new RouteHandler();
                var tripId = $stateParams.tripId;
                var dayId = $stateParams.dayId;

                $timeout(function () {
                    textAngularManager.retrieveEditor("route").scope.displayElements.text.trigger("focus");
                }, 100);


                function init() {
                    routeHandler.get(routeId, dayId, tripId).then(function (extension) {
                        $scope.route = extension;
                    }, $scope.handleGenericError);
                }

                function update() {
                    routeHandler.edit($scope.route, dayId, tripId).then(function () {
                        $state.go("trip.view", {"id": tripId, noCache: false}, {reload: true});
                    }, $scope.handleGenericError);
                }

                function cancel() {
                    $state.go("trip.view", {"id": tripId, noCache: false}, {reload: true});
                }

                init();

            }

        ]);