"use strict";
angular.module("tripPlanner.extension.note")
        .factory("tp.ext.note.NoteHandler", [
            "$q", "tp.ext.note.NoteHttp", "tp.ext.note.NoteModel", "tp.trip.TripCache",
            function NoteHandlerFactory($q, NoteHttp, Note, tripCache) {

                function NoteHandler() {}

                NoteHandler.prototype.create = function (note) {
                    return NoteHttp.create(note);
                };

                NoteHandler.prototype.edit = function (note) {
                    return NoteHttp.edit(note);
                };
                NoteHandler.prototype.remove = function (noteId, dayId) {
                    return NoteHttp.remove(noteId, dayId).then(function () {
                        tripCache.removeDayExtension(noteId, dayId);
                    });
                };

                NoteHandler.prototype.get = function (noteId, dayId, tripId) {
                    return NoteHttp.get(noteId, dayId).then(function (e) {
                        var n = new Note(tripId, dayId);
                        return n.convertFromServer(e);
                    });
                };


                return NoteHandler;

            }

        ]);