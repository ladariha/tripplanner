"use strict";
angular.module("tripPlanner.extension.note")
        .factory("tp.ext.note.NoteHandler", ["$q","tp.ext.note.NoteHttp",
            function NoteHandlerFactory($q, NoteHttp) {


                function NoteHandler() {}



                NoteHandler.prototype.create = function (note) {
                    return NoteHttp.create(note);
                };


                return NoteHandler;

            }

        ]);