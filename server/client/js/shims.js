"use strict";

(function () {

    var monthsNames = {
        "fullName": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "shortName": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };

    Date.prototype.toPrettyString = function () {
        return this.getDate() + " " + monthsNames.fullName[this.getMonth()] + " " + this.getFullYear();
    };
})();