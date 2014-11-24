"use strict";
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var User = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        displayName: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        displayName: String
    }

});

// methods ======================
// generating a hash
User.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model("User", User);