"use strict";

var ExtDao = require("../dao");

function RouteDao() {
    ExtDao.apply(this, ["Route"]);
}

RouteDao.prototype = Object.create(ExtDao.prototype);

module.exports = new RouteDao();



