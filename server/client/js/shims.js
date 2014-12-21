"use strict";

(function () {

    var monthsNames = {
        "fullName": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "shortName": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    };

    Date.prototype.toPrettyString = function () {
        return this.getDate() + " " + monthsNames.fullName[this.getMonth()] + " " + this.getFullYear();
    };
    
    /**
     * Converts from "03-December-2014" to Date object 
     * @param {type} dateString
     * @returns {Date.prototype}
     */
    Date.prototype.getFromInput = function(dateString){
        var values = dateString.split("-");
        this.setDate(parseInt(values[0], 10));
        this.setFullYear(parseInt(values[2], 10));
        this.setMonth(monthsNames.fullName.indexOf(values[1]));
        return this;
        
    };

})();