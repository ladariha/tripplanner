"use strict";
angular.module("tripPlanner.extension.note")
        .controller("tp.ext.note.NoteCtrl", [
            "$scope", "$stateParams", "$state", "tp.ext.note.NoteHandler", "tp.ext.note.NoteModel", "textAngularManager", "$timeout", "tp.trip.TripCache",
            function NoteCtrl($scope, $stateParams, $state, NoteHandler, Note, textAngularManager, $timeout, TripCache) {
                var tripDay = $stateParams.tripDay;
                var noteHandler = new NoteHandler();
                $scope.isEdit = false;
                $scope.dayName = tripDay.name;
                $scope.localDate = tripDay.localDate.toPrettyString();
                $scope.note = new Note(tripDay.tripId, tripDay.id);
                $scope.create = create;
                $scope.cancel = cancel;

                $timeout(function () {
                    textAngularManager.retrieveEditor("note").scope.displayElements.text.trigger("focus");
                }, 100);

                function create() {
                    noteHandler.create($scope.note).then(function (ext) {
                        addCreatedNoteToDay(ext);
                        $state.go("trip.view", {"id": tripDay.tripId, noCache: false}, {reload: true});
                    }, $scope.handleGenericError);
                }

                function addCreatedNoteToDay(extensionData) {
                    var trip = TripCache.get();
                    for (var i = 0, max = trip.days.length; i < max; i++) {
                        if (trip.days[i].id === tripDay.id) {
                            trip.days[i].data.push(extensionData);
                            return;
                        }
                    }
                }

                function cancel() {
                    $state.go("trip.view", {"id": tripDay.tripId, noCache: false}, {reload: true});
                }
            }
        ])
        .controller("tp.ext.note.NoteEditCtrl", [
            "$scope", "$stateParams", "$state", "tp.ext.note.NoteHandler", "tp.ext.note.NoteModel", "textAngularManager", "$timeout", "tp.trip.TripCache",
            function NoteEditCtrl($scope, $stateParams, $state, NoteHandler, Note, textAngularManager, $timeout, TripCache) {

                $scope.dayName = $stateParams.dayName;
                $scope.note = new Note($stateParams.tripId, $stateParams.dayId);
                $scope.update = update;
                $scope.cancel = cancel;
                $scope.isEdit = true;

                var noteId = $stateParams.id;
                var noteHandler = new NoteHandler();
                var tripId = $stateParams.tripId;
                var dayId = $stateParams.dayId;

                $timeout(function () {
                    textAngularManager.retrieveEditor("note").scope.displayElements.text.trigger("focus");
                }, 100);


                function init() {
                    noteHandler.get(noteId, dayId, tripId).then(function (extension) {
                        $scope.note = extension;
                    }, $scope.handleGenericError);
                }


                function update() {
                    noteHandler.edit($scope.note).then(function (ext) {
                        addUpdatedNoteToDay(ext);
                        $state.go("trip.view", {"id": tripId, noCache: false}, {reload: true});
                    }, $scope.handleGenericError);
                }

                function addUpdatedNoteToDay(extensionData) {
                    extensionData.tripDayId = dayId;
                    extensionData.tripId = tripId;
                    var trip = TripCache.get();
                    for (var i = 0, max = trip.days.length; i < max; i++) {
                        if (trip.days[i].id === dayId) {
                            for (var j =0, maxj = trip.days[i].data.length; j < maxj; j++) {
                                if (trip.days[i].data[j].id === noteId) {
                                    trip.days[i].data[j] = extensionData;
                                    return;
                                }
                            }
                        }
                    }
                }

                function cancel() {
                    $state.go("trip.view", {"id": tripId, noCache: false}, {reload: true});
                }

                init();

            }

        ]);