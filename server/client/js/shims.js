"use strict";

(function () {

    var monthsNames = {
        "fullName": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "shortName": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };

    Date.prototype.toPrettyString = function (separator, showZeros) {
        separator = separator ? separator : " ";
        if (!showZeros) {
            return this.getDate() + separator + monthsNames.fullName[this.getMonth()] + separator + this.getFullYear();
        } else {
            return (this.getDate() > 9 ? this.getDate() : "0" + this.getDate()) + separator + monthsNames.fullName[this.getMonth()] + separator + this.getFullYear();
        }
    };

    /**
     * Converts from "03-December-2014" to Date object in local timezone 
     * @param {type} dateString
     * @returns {Date.prototype}
     */
    Date.prototype.getFromInput = function (dateString, separator) {
        separator = (typeof separator !== "undefined" && separator !== null) ? separator : "-";
        var values = dateString.split(separator);
        this.setDate(parseInt(values[0], 10));
        this.setFullYear(parseInt(values[2], 10));
        this.setMonth(monthsNames.fullName.indexOf(values[1]));
        return this;

    };

    Array.prototype.move = function (oldIndex, newIndex) {
        if (newIndex >= this.length || newIndex < 0) {
            return;
        }
        this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
    };

})();