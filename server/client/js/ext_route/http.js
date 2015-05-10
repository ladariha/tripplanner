"use strict";
angular.module("tripPlanner.extension.route")
        .factory("tp.ext.route.RouteHttp", ["tp.ext.ExtHttp",
            function RouteHttp(ExtHttp) {

                function HttpService() {
                    ExtHttp.apply(this, ["route"]);
                }
                HttpService.prototype = Object.create(ExtHttp.prototype);

                return new HttpService();

            }]);