"use strict";

angular.module("tripPlanner.map")
        .factory("tp.map.googlemaps", ["$http", "tp.place.models.PlaceModel", function($http, Place) {

                function Place(){};


                function MapProvider() {
                    window.console.log("created");
                    this.directionsService = new google.maps.DirectionsService();
                    this.mapAlreadyRendered = false;
                    this.directionsDisplay = new google.maps.DirectionsRenderer();
                    this.mocks = {
                        "places": [new Place("Prague, Czech Republic", 50.0755381, 14.43780049999998),
                            new Place("Ostrava, Czech Republic", 49.8209226, 18.262524299999995)
                        ]
                    };
                }

                MapProvider.prototype._getDirections = function(from, to, units, avoids, waypoints, callback) {
                    var options = {
                        origin: new google.maps.LatLng(from.latitude, from.longitude),
                        destination: new google.maps.LatLng(to.latitude, to.longitude),
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: units === "km" ? google.maps.UnitSystem.METRIC : google.maps.UnitSystem.IMPERIAL,
                        provideRouteAlternatives: true,
                        waypoints: waypoints,
                        optimizeWaypoints: waypoints.length > 0 ? true : false,
                        avoidHighways: avoids.highways,
                        avoidTolls: avoids.tolls
                    };
                    this.directionsService.route(options, function(response, status) {
                        /* jshint eqeqeq:false */
                        if (status == google.maps.DirectionsStatus.OK) {
                            /* jshint eqeqeq:true */
                            callback(null, response);
                        } else {
                            callback(response, null);
                        }
                    });
                };

                /**
                 * Binds given element to Google Maps autocomplete. Once user clicks
                 * on some item from completion options, function passed as callback 
                 * parameter is invoked with single parameter, object representing
                 * the selected place
                 * @param {Element} inputElement
                 * @param {Function} callback
                 * @param {String} identifier custom identifier for you to find out which element has been used to invoke this function
                 * @returns {undefined}
                 */
                MapProvider.prototype.bindAutocomplete = function(inputElement, callback, identifier) {
                    var _a = new google.maps.places.Autocomplete(inputElement);
                    google.maps.event.addListener(_a, "place_changed", function() {
                        var pl = _a.getPlace();
                        /* jshint camelcase:false */
                        callback(new Place(pl.formatted_address, pl.geometry.location.lat(), pl.geometry.location.lng()), identifier);
                        /* jshint camelcase:true */
                    });
                };

                /**
                 * Retrieves directions (without waypoints)
                 * @param {String} from
                 * @param {String} to
                 * @param {String} units
                 * @param {Object} avoids
                 * @param {Function} callback
                 */
                MapProvider.prototype.getSimpleDirections = function(from, to, units, avoids, callback) {
                    this._getDirections(from, to, units, avoids, [], callback);
                };
                /**
                 * Retrieves directions (without waypoints)
                 * @param {String} from
                 * @param {String} to
                 * @param {String} units
                 * @param {Object} avoids
                 * @param {Function} callback
                 */
                MapProvider.prototype.getDebugDirections = function(callback) {
                    $http.get("./js/modules/googlemaps/google_directions.json").success(function(result) {
                        callback(null, result);
                    }).error(function(data, status) {
                        callback({"data": data, "status": status}, null);
                    });
                };

                /**
                 * 
                 * @param {Array} routes array of objects returned by getSimpleDirections()
                 * @param {String} elementId ID of element where map should be placed
                 * @param {Number} index index of route from routes parameter to be displayed (starts with 0)
                 * @param {String} panelElementId element ID of element where route descriptions should be placed
                 * @returns {undefined}
                 */
                MapProvider.prototype.displayRoute = function(routes, elementId, index, panelElementId) {
                    if (!this.mapAlreadyRendered) {
                        var map = new google.maps.Map(window.document.getElementById(elementId), {"hideRouteList": true});
                        this.directionsDisplay.setPanel(window.document.getElementById(panelElementId));
                        this.directionsDisplay.setMap(map);
                        this.directionsDisplay.setDirections(routes);
                        this.mapAlreadyRendered = true;
                    }

                    this.directionsDisplay.setRouteIndex(index);
                };
                /**
                 * Removes all other routes from the data parameter (it is object returned by getSimpleDirections()) and leaves only route specified by index
                 * @param {Object} data
                 * @param {Number} index
                 * @returns {Object}
                 */
                MapProvider.prototype.getFinalRouteObject = function(data, index) {
                    var _r = data.routes[index];
                    data.routes = [_r];
                    return data;
                };
                /**
                 * Returns route length in metres
                 * @param {google.maps.DirectionsResult} direction results
                 * @param {Number} routeIndex index of route from routes parameter to be used (starts with 0)
                 * @returns {Number} route length in metres
                 */
                MapProvider.prototype.getDistance = function(results, routeIndex) {
                    return results.routes[routeIndex].legs[0].distance.value;
                };

                /**
                 * Returns route's duration in minutes
                 * @param {google.maps.DirectionsResult} direction results
                 * @param {Number} routeIndex index of route from routes parameter to be used (starts with 0)
                 * @returns {Number} route duration in minutes
                 */
                MapProvider.prototype.getDuration = function(results, routeIndex) {
                    return Math.round(results.routes[routeIndex].legs[0].duration.value / 60);
                };

                return MapProvider;
            }]);

