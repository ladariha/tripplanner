"use strict";

var ExtDao = require("../dao");

function NoteDao() {
    ExtDao.apply(this, ["Note"]);
}

NoteDao.prototype = Object.create(ExtDao.prototype);

module.exports = new NoteDao();



