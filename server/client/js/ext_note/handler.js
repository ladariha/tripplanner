"use strict";
angular.module("tripPlanner.extension.note")
        .factory("tp.ext.note.NoteHandler", ["$q", "tp.ext.ExtensionSPI",
            function NoteHandlerFactory($q, ExtensionSPI) {

                var extensions = [];

                function NoteHandler() {
                    ExtensionSPI.call(this);
                }
                
                
                
                NoteHandler.prototype = Object.create(ExtensionSPI.prototype);

            
                return NoteHandler;

            }

        ]);