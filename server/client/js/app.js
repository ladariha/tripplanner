"use strict";


// Declare app level module which depends on filters, and services
angular.module("tripPlanner", [
    "ui.router",
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
]).config(["$stateProvider", "$provide", "$httpProvider", "$urlRouterProvider", function ($stateProvider, $provide, $httpProvider, $urlRouterProvider) {

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

        $stateProvider
                .state("home", {
                    url: "/",
                    templateUrl: "js/home/partial/home.html",
                    controller: "tp.home.HomeCtrl"
                })
                .state("tripNew", {
                    url: "/trip/new",
                    templateUrl: "js/trip/partial/tripForm.html",
                    controller: "tp.trip.NewTripCtrl"
                })
                .state("trip", {
                    url: "/trip/:id",
                    templateUrl: "js/trip/partial/trip.html",
                    controller: "tp.trip.ViewTripCtrl",
                    resolve: {
                        "trip": ["tp.trip.TripHandler", "$route", function (tripHandler, $route) {
                                return new tripHandler().get($route.current.params.id);
                            }]
                    }
                })
                .state("login", {
                    url: "/login",
                    templateUrl: "js/auth/partial/login.html",
                    controller: "tp.auth.LoginCtrl"
                });

        $urlRouterProvider.otherwise("/");
    }]);



