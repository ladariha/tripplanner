"use strict";


// Declare app level module which depends on filters, and services
angular.module("tripPlanner", [
    "ngRoute",
    "ngAnimate",
    "ui.bootstrap",
    "tripPlanner.auth",
    "tripPlanner.core",
    "tripPlanner.place",
    "tripPlanner.trip",
    "tripPlanner.tripDay",
    "tripPlanner.user",
    "tripPlanner.map",
    "tripPlanner.logger",
    "tripPlanner.controllers",
    "tripPlanner.utils",
    "tripPlanner.home",
    "tripPlanner.session"
]).config(["$routeProvider", "$provide", "$httpProvider", function ($routeProvider, $provide, $httpProvider) {

        $provide.factory("busyIndicatorInterceptor", function ($q, $rootScope) {
            return {
                "request": function (config) {
                    $rootScope.$broadcast("busyMode", true);
                    return config || $q.when(config);
                },
                "response": function (response) {
                    $rootScope.$broadcast("busyMode", false);
                    return response || $q.when(response);
                }
            };
        });

        $httpProvider.interceptors.push("busyIndicatorInterceptor");
        $routeProvider.when("/trip/new", {templateUrl: "js/trip/partial/tripForm.html", controller: "tp.trip.NewTripCtrl"});
        $routeProvider.when("/trip/:id", {templateUrl: "js/trip/partial/trip.html", controller: "tp.trip.ViewTripCtrl"});
        $routeProvider.when("/", {templateUrl: "js/home/partial/home.html", controller: "tp.home.HomeCtrl"});
        $routeProvider.otherwise({redirectTo: "/"});
    }]);



