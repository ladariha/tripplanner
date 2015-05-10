"use strict";
angular.module("tripPlanner.extension.route")
        .controller("tp.ext.route.RouteCtrl", [
            "$scope", "$stateParams", "$state", "tp.ext.route.RouteHandler", "tp.ext.route.RouteModel", "tp.map.MapProvider", "$timeout",
            function RouteCtrl($scope, $stateParams, $state, RouteHandler, Route, mapProvider, $timeout) {
                var tripDay = $stateParams.tripDay;
                var routeHandler = new RouteHandler();
                var map = mapProvider.getDefaultProvider();
                
                
                $scope.isEdit = false;
                $scope.dayName = tripDay.name;
                $scope.localDate = tripDay.localDate.toPrettyString();
                $scope.route = new Route(tripDay.tripId, tripDay.id);
                $scope.create = create;
                $scope.cancel = cancel;

                function placeSelected(place, identifier) {
                    console.log(place);
                    $scope.route.setPlace(place, identifier);
                    $scope.ngRefresh();
                }

                function init() {
                    map.bindAutocomplete(window.document.getElementById("from-input"), placeSelected, "from");
                    map.bindAutocomplete(window.document.getElementById("to-input"), placeSelected, "to");
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