"use strict";
angular.module("tripPlanner.dayextension")
        .factory("tp.ext.TripDayExtModel", ["tp.validators", "tp.session.Session",
            function TripDayExtModelFactory(rules, Session) {

                function TripDayExtModel(tripId, tripDayId) {
                    this.tripId = tripId;
                    this.tripDayId = tripDayId;
                    this.data = null;
                    this.name = null;
                    this.id = -1;
                    this.size = 50; // size in %
                    this.author = Session.getUser().userId;
                }

                TripDayExtModel.prototype.isValid = function () {
                    return rules.definedNotNull(this.tripDayId) &&
                            rules.definedNotNull(this.tripId) &&
                            rules.definedNotNull(this.data) &&
                            rules.definedNotNull(this.author) &&
                            rules.definedNotNull(this.id) &&
                            rules.definedNotNull(this.name);
                };

                TripDayExtModel.prototype.convertFromServer = function (obj) {
                    this.data = obj.data;
                    this.name = obj.name;
                    this.id = obj.id;
                    this.size = obj.size;
                    this.author = obj.author;
                    if (obj.tripId) {
                        this.tripId = obj.tripId;
                    }
                    if (obj.tripDayId) {
                        this.tripDayId = obj.tripDayId;
                    }
                    return this;
                };

                return TripDayExtModel;

            }

        ]);