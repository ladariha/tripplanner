"use strict";
angular.module("tripPlanner.extension.note")
        .factory("tp.ext.note.NoteHandler", ["$q", "tp.ext.note.NoteHttp", "tp.ext.note.NoteModel",
            function NoteHandlerFactory($q, NoteHttp, Note) {


                function NoteHandler() {}



                NoteHandler.prototype.create = function (note) {
                    return NoteHttp.create(note);
                };
                
                NoteHandler.prototype.edit = function (note) {
                    return NoteHttp.edit(note);
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