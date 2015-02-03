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
    "tripPlanner.session",
    "tripPlanner.dialog"
]).config(["$stateProvider", "$provide", "$httpProvider", "$urlRouterProvider", function ($stateProvider, $provide, $httpProvider, $urlRouterProvider) {

        $provide.factory("busyIndicatorInterceptor", function BusyIndicatorInterceptor($q, $rootScope) {
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
                .state("trip", {
                    abstract: true,
                    params: {"noCache": false},
                    url: "/trip/:id",
                    templateUrl: "js/trip/partial/trip.html",
                    controller: "tp.trip.ViewTripCtrl",
                    resolve: {
                        "trip": ["tp.trip.TripHandler", "$stateParams", function (TripHandler, $stateParams) {
                                if ($stateParams.id && $stateParams.id !== "new") {
                                    return new TripHandler().get($stateParams.id, $stateParams.noCache);
                                }
                            }]
                    }
                })
                .state("trip.new", {
                    templateUrl: "js/trip/partial/tripForm.html",
                    controller: "tp.trip.TripFormCtrl"
                })
                .state("trip.view", {
                    url: "",
                    templateUrl: "js/trip/partial/tripInfo.html"
                })
                .state("trip.edit", {
                    templateUrl: "js/trip/partial/tripForm.html",
                    controller: "tp.trip.TripFormCtrl"
                })
                .state("day", {
                    abstract: true,
                    params: {"noCache": false},
                    url: "/day/:id",
                    templateUrl: "js/tripday/partial/tripDay.html",
                    controller: "tp.tripDay.ViewTripDayCtrl",
                    resolve: {
                        "trip": ["tp.tripDay.TripDayHandler", "$stateParams", function (TripDayHandler, $stateParams) {
                                if ($stateParams.id && $stateParams.id !== "new") {
                                    return new TripDayHandler().get($stateParams.id, $stateParams.noCache);
                                }
                            }]
                    }
                })
                .state("day.new", {
                    templateUrl: "js/tripday/partial/tripForm.html",
                    controller: "tp.tripDay.TripDayFormCtrl"
                })
                .state("day.view", {
                    url: "",
                    templateUrl: "js/tripday/partial/tripInfo.html"
                })
                .state("day.edit", {
                    templateUrl: "js/tripday/partial/tripForm.html",
                    controller: "tp.tripDay.TripDayFormCtrl"
                })
                .state("login", {
                    url: "/login",
                    templateUrl: "js/auth/partial/login.html",
                    controller: "tp.auth.LoginCtrl"
                })
                .state("user", {
                    url: "/user/:id",
                    resolve: {
                        "user": ["tp.user.UserHandler", "$stateParams", function (userHandler, $stateParams) {
                                return userHandler.getUser($stateParams.id);

                            }]
                    },
                    templateUrl: "js/user/partial/user.html",
                    controller: "tp.user.UserCtrl"
                });

        $urlRouterProvider.otherwise("/");
    }]);



