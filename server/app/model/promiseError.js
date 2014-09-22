"use strict";
/**
 * General error to be passed as parameter to promise's reject function
 * @param {type} type
 * @param {type} msg
 * @param {type} data
 * @returns {TPError}
 */
function TPError(type, msg, data) {
    this.type = type;
    this.msg = msg || "unknown";
    this.data = data;
}

TPError.BadRequest = "BadRequest";
TPError.DatabaseError = "DatabaseError";

module.exports = TPError;

        