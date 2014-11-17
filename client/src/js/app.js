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
    "tripPlanner.utils"
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
        $routeProvider.when("/trip/new", {templateUrl: "partials/create/trip.html", controller: "NewTripCtrl"});
        $routeProvider.when("/trip/:id", {templateUrl: "partials/view/trip.html", controller: "ViewTripCtrl"});
        $routeProvider.when("/", {templateUrl: "partials/view/home.html", controller: "HomeCtrl"});
        $routeProvider.otherwise({redirectTo: "/"});
    }]);



