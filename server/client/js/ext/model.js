"use strict";
angular.module("tripPlanner.dayextension")
        .factory("tp.ext.TripDayExtModel", ["tp.validators", "tp.session.Session",
            function TripDayExtModel(rules, Session) {

                function TripDayExtModel(tripId, tripDayId) {
                    this.tripId = tripId;
                    this.tripDayId = tripDayId;
                    this.data = null;
                    this.name = null;
                    this.id = -1;
                    this.author = Session.getUser().userId;
                }

                TripDayExtModel.prototype.isValid = function () {
                    return rules.definedNotNull(this.tripDayId)
                            && rules.definedNotNull(this.tripId)
                            && rules.definedNotNull(this.data)
                            && rules.definedNotNull(this.author)
                            && this.data.length > 0
                            && rules.definedNotNull(this.id)
                            && rules.definedNotNull(this.name);
                };

                return TripDayExtModel;

            }

        ]);