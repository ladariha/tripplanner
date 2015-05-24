"use strict";

angular.module("tripPlanner.auth", ["tripPlanner.core", "tripPlanner.session"]);
angular.module("tripPlanner.core", ["tripPlanner.utils", "tripPlanner.user"]);
angular.module("tripPlanner.dayextension", ["tripPlanner.core", "tripPlanner.session"]);
angular.module("tripPlanner.extension.note", [
    "tripPlanner.dayextension",
    "tripPlanner.utils",
    "tripPlanner.trip",
    "tripPlanner.tripDay",
    "tripPlanner.user",
    "tripPlanner.logger",
    "tripPlanner.session"]);
angular.module("tripPlanner.home", []);
angular.module("tripPlanner.logger", []);
angular.module("tripPlanner.map", ["tripPlanner.place"]);
angular.module("tripPlanner.place", ["tripPlanner.utils"]);
angular.module("tripPlanner.session", []);
angular.module("tripPlanner.trip", [
    "tripPlanner.tripDay",
    "tripPlanner.core",
    "tripPlanner.utils",
    "tripPlanner.session",
    "tripPlanner.logger"]);
angular.module("tripPlanner.tripDay", [
    "tripPlanner.core",
    "tripPlanner.utils",
    "tripPlanner.trip",
    "tripPlanner.session",
    "tripPlanner.logger",
    "tripPlanner.dayextension"]);
angular.module("tripPlanner.user", ["tripPlanner.utils", "tripPlanner.core", "tripPlanner.session"]);
angular.module("tripPlanner.dialog", []);
angular.module("tripPlanner.extension.route", [
    "tripPlanner.dayextension",
    "tripPlanner.utils",
    "tripPlanner.trip",
    "tripPlanner.tripDay",
    "tripPlanner.user",
    "tripPlanner.logger",
    "tripPlanner.place",
    "tripPlanner.map",
    "tripPlanner.core",
    "tripPlanner.session"]);