"use strict";

function ResponseError(httpCode, msg) {
    this.httpCode = httpCode;
    this.msg = msg;
}
ResponseError.prototype.test = function(){};
ResponseError.prototype = Object.create(Error.prototype);
ResponseError.prototype.constructor = ResponseError;

module.exports = ResponseError;


