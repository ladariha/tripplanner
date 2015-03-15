"use strict";
angular.module("tripPlanner.extension.note")
        .factory("tp.ext.note.NoteModel", ["tp.validators",
            function NoteModel(rules) {

                function Note(tripId, tripDayId) {
                    this.tripId = tripId;
                    this.tripDayId = tripDayId;
                    this.data = null;
                }

                Note.prototype.isValid = function () {
                    return rules.definedNotNull(this.tripDayId) && rules.definedNotNull(this.tripId) && rules.definedNotNull(this.data) && this.data.length > 0;
                };

                return Note;

            }

        ]);