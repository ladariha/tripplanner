"use strict";

/* Services */

angular.module("tripPlanner.map")
        .value("version", "0.1")
        .factory("tp.map.MapProvider", ["tp.map.googlemaps", function(GoogleMaps) {

                function Maps() {
                    this._providers = {
                        "google": GoogleMaps
                    };
                }

                /**
                 * Returns new instance of selected provider
                 * @param {String} name name of required map provider
                 * @returns {Object}
                 */
                Maps.prototype.getMapProvider = function(name) {
                    return new this._providers[name]();
                };

                return new Maps();
            }]);
