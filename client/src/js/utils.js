"use strict";

angular.module("tripPlanner.utils", [])
        .factory("tp.validators", function () {

            return {
                definedNotNull: function (obj) {
                    return (typeof obj !== "undefined" && obj !== null);
                }
            };

        })
        .factory("tp.ConsumptionConvertor", function () {

            function toLkm(value, incomingFormat) {
                switch (incomingFormat) {
                    case "kml": // km/l
                        return 100 / parseInt(value, 10);
                    case "lkm": // l/100km
                        return value;
                    case "mpg_uk":
                        return 282.4809363 / parseInt(value, 10);
                    case "mpg_us":
                        return 235.2145833 / parseInt(value, 10);
                    case "mil":
                        return 62.137119223734 / parseInt(value, 10);
                    default :
                        throw new Error("Unknown format");
                }
            }

            function lkmToMetric(value, targetFormat) {
                switch (targetFormat) {
                    case "lkm":
                        return value;
                    case "kml": // km/l
                        return 100 / parseInt(value, 10);
                    case "mpg_uk":
                        return 282.4809363 / parseInt(value, 10);
                    case "mpg_us":
                        return 235.2145833 / parseInt(value, 10);
                    case "mil":
                        return 62.137119223734 / parseInt(value, 10);
                    default :
                        throw new Error("Unknown format");
                }
            }



            return {
                /**
                 * Converts fuel consumption from given metric system to specified
                 * metric system
                 * @param {Number} value
                 * @param {String} from possible values: kml, lkm, mpg_uk, mpg_us, mil
                 * @param {String} to possible values: kml, lkm, mpg_uk, mpg_us, mil
                 * @returns {Number}
                 */
                convert: function (value, from, to) {
                    var base = toLkm(value, from);
                    return lkmToMetric(base, to);
                }
            };
        })
        .factory("tp.TimeDateConvertor", function () {

            var monthsNames = {
                "fullName": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                "shortName": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            };

            return {
                localToUTCString: function (date) {
                    return date.getUTCFullYear() +
                            "-" + ((date.getUTCMonth() + 1 < 10) ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1)) +
                            "-" + ((date.getUTCDate() < 10) ? "0" + date.getUTCDate() : date.getUTCDate()) +
                            " " + ((date.getUTCHours() < 10) ? "0" + date.getUTCHours() : date.getUTCHours()) +
                            ":" + ((date.getUTCMinutes() < 10) ? "0" + date.getUTCMinutes() : date.getUTCMinutes()) +
                            ":" + ((date.getUTCSeconds() < 10) ? "0" + date.getUTCSeconds() : date.getUTCSeconds());
                },
                UTCToDate: function (dateString) {
                    var _d = new Date();
                    var _split = dateString.split(" ");
                    var _yearMonthDay;
                    var _time;

                    _yearMonthDay = _split[0].split("-");
                    _yearMonthDay.forEach(function (item, index) {
                        _yearMonthDay[index] = parseInt(item, 10);
                    });

                    _time = _split[1].split(":");
                    _time.forEach(function (item, index) {
                        _time[index] = parseInt(item, 10);
                    });

                    _d.setUTCFullYear(_yearMonthDay[0]);
                    _d.setUTCMonth(_yearMonthDay[1] - 1);
                    _d.setUTCDate(_yearMonthDay[2]);
                    _d.setUTCHours(_time[0]);
                    _d.setUTCMinutes(_time[1]);
                    _d.setUTCSeconds(_time[2]);

                    return _d;
                },
                toPrettyString : function(d){
                    return d.getDate() + " " + monthsNames.fullName[d.getMonth()] + " " + d.getYear();
                }
            };
        });