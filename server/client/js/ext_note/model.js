"use strict";
angular.module("tripPlanner.extension.note")
        .factory("tp.ext.note.NoteModel", ["tp.validators", "tp.ext.TripDayExtModel",
            function NoteModel(rules, DayExtensionModel) {

                function Note(tripId, tripDayId) {
                    DayExtensionModel.apply(this, [tripId, tripDayId]);
                     this.name = "note";
                }
                
                Note.prototype = Object.create(DayExtensionModel.prototype);

                return Note;

            }

        ]);