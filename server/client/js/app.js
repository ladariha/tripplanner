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
                .state("trip", {
                    abstract: true,
                    params: {"noCache": false},
                    url: "/trip/:id",
                    templateUrl: "js/trip/partial/trip.html",
                    resolve: {
                        "trip": ["tp.trip.TripHandler", "$stateParams", function (tripHandler, $stateParams) {
                                if ($stateParams.id && $stateParams.id !== "new") {
                                    return new tripHandler().get($stateParams.id, $stateParams.noCache);
                                }
                            }]
                    }
                })
                .state("trip.view", {
                    url: "",
                    templateUrl: "js/trip/partial/tripInfo.html",
                    controller: "tp.trip.ViewTripCtrl"
                })
                .state("trip.new", {
                    templateUrl: "js/trip/partial/tripForm.html",
                    controller: "tp.trip.TripFormCtrl"
                })
                .state("trip.edit", {
                    templateUrl: "js/trip/partial/tripForm.html",
                    controller: "tp.trip.TripFormCtrl"
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



