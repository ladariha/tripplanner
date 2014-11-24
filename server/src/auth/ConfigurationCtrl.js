"use strict";
// http://scotch.io/tutorials/javascript/easy-node-authentication-google

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var User = require("./UserModel");
var fs = require("fs");
var path = require("path");
var configAuth = JSON.parse(fs.readFileSync(path.join(path.dirname(__filename), "private.json")).toString());
var session = require("express-session");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var flash = require("connect-flash");

function configurePassport(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use(new GoogleStrategy({
        clientID: configAuth.google.clientID,
        clientSecret: configAuth.google.clientSecret,
        callbackURL: configAuth.google.callbackURL
    },
    function (token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won"t fire until we have all our data back from Google
        process.nextTick(function () {

            // try to find the user based on their google id
            User.findOne({"google.id": profile.id}, function (err, user) {
                if (err){
                    return done(err);
                }
                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = new User();
                    // set all of the relevant information
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
}

exports.configure = function (app) {
    configurePassport(passport);
    // require("./config/passport")(passport); // pass passport for configuration
    app.use(morgan("dev")); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)    
    app.use(session({secret: "ilovescotchscotchyscotchscotch"})); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session  
    return passport;
};