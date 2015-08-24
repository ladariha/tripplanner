"use strict";
angular.module("tripPlanner.extension.note")
        .controller("tp.ext.note.NoteCtrl", [
            "$scope", "$stateParams", "$state", "tp.ext.note.NoteHandler", "tp.ext.note.NoteModel", "textAngularManager", "$timeout",
            function NoteCtrl($scope, $stateParams, $state, NoteHandler, Note, textAngularManager, $timeout) {
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
                    noteHandler.create($scope.note).then(function () {
                        $state.go("trip.view", {"id": tripDay.tripId, noCache: false}, {reload: true});
                    }, $scope.handleGenericError);
                }

                function cancel() {
                    $state.go("trip.view", {"id": tripDay.tripId, noCache: false}, {reload: true});
                }
            }
        ])
        .controller("tp.ext.note.NoteEditCtrl", [
            "$scope", "$stateParams", "$state", "tp.ext.note.NoteHandler", "tp.ext.note.NoteModel", "textAngularManager", "$timeout",
            function NoteEditCtrl($scope, $stateParams, $state, NoteHandler, Note, textAngularManager, $timeout) {

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
                    noteHandler.edit($scope.note, dayId, tripId).then(function () {
                        $state.go("trip.view", {"id": tripId, noCache: false}, {reload: true});
                    }, $scope.handleGenericError);
                }

                function cancel() {
                    $state.go("trip.view", {"id": tripId, noCache: false}, {reload: true});
                }

                init();

            }

        ]);