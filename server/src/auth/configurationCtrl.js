"use strict";
// http://scotch.io/tutorials/javascript/easy-node-authentication-google

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var User = require("../user/model");
var fs = require("fs");
var path = require("path");
var configAuth = JSON.parse(fs.readFileSync(path.join(path.dirname(__filename), "private.json")).toString());
var session = require("express-session");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var flash = require("connect-flash");


function configureGoogle(passport) {
    passport.use(new GoogleStrategy({
        clientID: configAuth.google.clientID,
        clientSecret: configAuth.google.clientSecret,
        callbackURL: configAuth.google.callbackURL
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({"google.id": profile.id}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.displayName = profile.displayName;
                    newUser.google.email = profile.emails[0].value;
                    newUser.google.imageUrl = profile._json.picture;
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

function configureFacebook(passport) {
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebook.clientID,
        clientSecret: configAuth.facebook.clientSecret,
        callbackURL: configAuth.facebook.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({"facebook.id": profile.id}, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.displayName = profile.name.givenName + " " + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.facebook.imageUrl = "http://graph.facebook.com/" + profile.id + "/picture?type=square";
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }
    ));
}

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

    configureGoogle(passport);
    configureFacebook(passport);
}

exports.configure = function (app) {
    configurePassport(passport);
    // require("./config/passport")(passport); // pass passport for configuration
    app.use(morgan("dev")); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)    
    app.use(session({secret: "tripplannersecret"})); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session  
    return passport;
};

exports.scopes = {
    "google": {"scope": ["profile", "email"]},
    "facebook": {"scope": ["email"]}
};

exports.addCorsHeaders = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-TripPlanner-SessionId, X-TripPlanner-Created, X-TripPlanner-UserId, Content-Type");
    next();
};