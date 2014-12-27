"use strict";
// sample listener


var ct = require("../core/mediator");
ct.on("tripRemoved", function (id) {
    console.log("REMOVED " + id);
});
