"use strict";

var ut = require("util");


var http = {
    BadRequest: function (response, msg) {
        response.writeHead(400, {
            "Content-Type": "text/plain"
        });
        response.write(msg);
        response.end();
    },
    DatabaseError: function (response, msg) {
        response.writeHead(500, {
            "Content-Type": "text/plain"
        });
        response.write(msg);
        response.end();
    },
    Ok: function (response, data) {
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(data));
        response.end();
    }
};



module.exports = http;
