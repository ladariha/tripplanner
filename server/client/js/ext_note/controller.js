"use strict";
angular.module("tripPlanner.extension.note")
        .controller("tp.ext.note.NoteCtrl", ["$scope","$stateParams","$state", "tp.ext.note.NoteHandler","tp.ext.note.NoteModel",
            function NoteCtrl($scope, $stateParams, $state, NoteHandler, Note) {
                var tripDay = $stateParams.tripDay;
                var noteHandler = new NoteHandler();
                
                $scope.dayName = tripDay.name;
                $scope.localDate = tripDay.localDate.toPrettyString();
                $scope.note = new Note(tripDay.tripId, tripDay.id);
                $scope.create = create;
                $scope.cancel = cancel;
                
                
                function create(){
                    noteHandler.create($scope.note);
                }
                
                
                function cancel(){
                    $state.go("trip.view", {"id": tripDay.tripId, noCache: false}, {reload: true});
                }
                

            }

        ]);