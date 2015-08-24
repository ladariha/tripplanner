"use strict";
angular.module("tripPlanner.extension.note")
        .factory("tp.ext.note.NoteHttp", ["tp.ext.ExtHttp",
            function NoteHttp(ExtHttp) {

                function HttpService() {
                    ExtHttp.apply(this, ["note"]);
                }
                HttpService.prototype = Object.create(ExtHttp.prototype);

                return new HttpService();

            }]);