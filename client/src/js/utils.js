"use strict";

angular.module("tripPlanner.utils", [])
        .factory("tp.validators", function() {

            return {
                definedNotNull: function(obj) {
                    return (typeof obj !== "undefined" && obj !== null);
                }
            };

        })
        .factory("tp.ConsumptionConvertor", function() {

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
                convert: function(value, from, to) {
                    var base = toLkm(value, from);
                    return lkmToMetric(base, to);
                }
            };
        });