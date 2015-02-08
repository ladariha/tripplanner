"use strict";

angular.module("tripPlanner.tripDay")
        .factory("tp.tripDay.TripDayModel", ["tp.validators", "tp.TimeDateConvertor", function TripDayModel(rules, timeDateConvertor) {
                function TripDay() {
                    this.id = -1;
                    this.tripId = -1;
                    this.name = "";
                    this.data = [];
                    this.date = null;
                    this.localDate = null;
                    this.description = "";
                }

                TripDay.prototype.isValid = function () {
                    return rules.definedNotNull(this.description) && rules.definedNotNull(this.tripId) && rules.definedNotNull(this.name) && rules.definedNotNull(this.data) && rules.definedNotNull(this.date);
                };

                TripDay.prototype.convertFromServer = function (obj) {
                    this.id = obj.id;
                    this.name = obj.name;
                    this.date = obj.date;
                    this.tripId = obj.tripId;
                    this.data = obj.data;
                    this.description = obj.description;
                    this.localDate = timeDateConvertor.UTCToDate(obj.date);
                    return this;
                };

                return TripDay;
            }]);
   