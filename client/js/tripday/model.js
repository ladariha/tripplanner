"use strict";

angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayModel", ["tp.validators", "tp.TimeDateConvertor", "tp.ext.TripDayExtModel",
            function TripDayModel(rules, timeDateConvertor, TripDayExtModel) {
                function TripDay(tripId) {
                    this.id = -1;
                    this.tripId = tripId;
                    this.name = "";
                    this.data = [];
                    this.date = null;
                    this.localDate = null;
                    this.description = "";
                }

                TripDay.prototype.isValid = function () {
                    return rules.definedNotNull(this.description) &&
                            rules.definedNotNull(this.tripId) &&
                            rules.definedNotNull(this.name) &&
                            rules.definedNotNull(this.data) &&
                            rules.definedNotNull(this.date);
                };

                TripDay.prototype.convertFromServer = function (obj) {
                    this.id = obj.id;
                    this.name = obj.name;
                    this.data = [];
                    for (var i = 0, max = obj.data.length; i < max; i++) {
                        this.data.push(new TripDayExtModel(obj.tripId, obj.id).convertFromServer(obj.data[i]));
                    }
                    this.date = obj.date;
                    this.tripId = obj.tripId;
                    this.description = obj.description;
                    this.localDate = timeDateConvertor.UTCToDate(obj.date);
                    return this;
                };

                return TripDay;
            }]);
   