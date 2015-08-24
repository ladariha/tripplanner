"use strict";
angular.module("tripPlanner.extension.route")
        .factory("tp.ext.route.RouteHandler", [
            "tp.ext.route.RouteHttp", "tp.ext.route.RouteModel", "tp.trip.TripCache", "tp.core.lzw",
            function RouteHandlerFactory(RouteHttp, Route, tripCache, lzw) {

                function RouteHandler() {}

                RouteHandler.prototype.create = function (route) {
                    route.data.raw.directionData = lzw.compress(JSON.stringify(route.data.raw.directionData));
                    route.data.raw.steps = lzw.compress(route.data.raw.steps);
                    return RouteHttp.create(route).then(function (ext) {
                        var n = new Route(route.tripId, route.tripDayId);
                        n.convertFromServer(ext);
                        tripCache.addExtensionToDay(n.tripDayId, n);
                    });
                };

                RouteHandler.prototype.edit = function (route) {
                    return RouteHttp.edit(route).then(function (ext) {
                        var n = new Route(route.tripId, route.tripDayId);
                        n.convertFromServer(ext);
                        tripCache.replaceDayExtension(n.id, n.tripDayId, n);
                    });
                };
                RouteHandler.prototype.remove = function (routeId, dayId) {
                    return RouteHttp.remove(routeId, dayId).then(function () {
                        tripCache.removeDayExtension(routeId, dayId);
                    });
                };

                RouteHandler.prototype.get = function (routeId, dayId, tripId) {
                    return RouteHttp.get(routeId, dayId).then(function (e) {
                        var n = new Route(tripId, dayId);
                        return n.convertFromServer(e);
                    });
                };


                return RouteHandler;

            }

        ]);