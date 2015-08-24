"use strict";



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
            "Content-Type": typeof data === "string" ? "text/plain" : "application/json"
        });
        response.write(JSON.stringify(data));
        response.end();
    },
    Unauthorized: function (response, msg) {
        response.writeHead(401, {
            "Content-Type": "text/plain"
        });
        response.write(msg);
        response.end();
    },
    NoContent: function (response) {
        response.writeHead(204, {
            "Content-Type": "text/plain"
        });
        response.end();
    },
    AuthenticationTimeout: function (response, msg) {
        response.writeHead(419, {
            "Content-Type": "text/plain"
        });
        response.write(msg);
        response.end();
    },
    NotFound: function (response, msg) {
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.write(msg);
        response.end();
    },
    respond: function (errorType, msg, res) {
        if (this.hasOwnProperty(errorType)) {
            this[errorType](res, msg);
        } else {
            res.writeHead(500, {
                "Content-Type": "text/plain"
            });
            res.write("error");
            res.end();
        }
    }
};



module.exports = http;
