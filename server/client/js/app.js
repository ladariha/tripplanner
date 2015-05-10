"use strict";
$.material.init();

(function () {
    var modules = [
        "ui.router",
        "ui.bootstrap",
        "textAngular",
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
        "tripPlanner.dialog",
        "tripPlanner.dayextension"
    ];
    var extensions;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            extensions = JSON.parse(xhr.responseText);
            for (var ext in extensions) {
                if (extensions.hasOwnProperty(ext) && typeof extensions[ext].module !== "undefined") {
                    modules.push(extensions[ext].module);
                }
            }
        }
    };
    xhr.open("GET", "api/ext/tripday", false); // need to be synchronous...
    xhr.send();

    angular.module("tripPlanner", modules).config(["$stateProvider", "$provide", "$httpProvider", "$urlRouterProvider", function ($stateProvider, $provide, $httpProvider, $urlRouterProvider) {

            $provide.factory("busyIndicatorInterceptor", function BusyIndicatorInterceptor($q, $rootScope) {
                return {
                    "request": function (config) {
                        $rootScope.$emit("busyMode", true);
                        return config || $q.when(config);
                    },
                    "response": function (response) {
                        $rootScope.$emit("busyMode", false);
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
                        params: {"noCache": false, "tripId": -1, "id": -1},
                        url: "/day/:id",
                        templateUrl: "js/tripday/partial/tripDay.html",
                        controller: "tp.tripDay.ViewTripDayCtrl",
                        resolve: {
                            "tripDay": ["tp.tripDay.TripDayHandler", "$stateParams", function (TripDayHandler, $stateParams) {
                                    if ($stateParams.id && $stateParams.id !== "new" && parseInt($stateParams.id, 10) !== -1) {
                                        return new TripDayHandler().get($stateParams.id, $stateParams.noCache);
                                    }
                                }],
                            "trip": ["tp.trip.TripHandler", "$stateParams", function (TripHandler, $stateParams) {
                                    if ($stateParams.tripId && $stateParams.tripId !== -1) {
                                        return new TripHandler().get($stateParams.tripId, $stateParams.noCache);
                                    }
                                }]
                        }
                    })
                    .state("day.new", {
                        templateUrl: "js/tripday/partial/tripDayForm.html",
                        controller: "tp.tripDay.TripDayFormCtrl"
                    })
                    .state("day.view", {
                        url: "",
                        templateUrl: "js/tripday/partial/tripInfo.html"
                    })
                    .state("day.edit", {
                        templateUrl: "js/tripday/partial/tripDayForm.html",
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
                            "user": ["tp.user.UserHandler", "$stateParams", function (UserHandler, $stateParams) {
                                    return new UserHandler().getUser($stateParams.id);

                                }]
                        },
                        templateUrl: "js/user/partial/user.html",
                        controller: "tp.user.UserCtrl"
                    });

            var ext;
            for (var e in extensions) {
                if (extensions.hasOwnProperty(e)) {
                    ext = extensions[e];
                    for (var s in ext.states) {
                        if (ext.states.hasOwnProperty(s)) {
                            $stateProvider.state(ext.states[s].name, {
                                templateUrl: ext.states[s].templateUrl,
                                controller: ext.states[s].ctrl,
                                params: ext.states[s].params,
                                url: ext.states[s].url});
                        }
                    }
                }
            }

            $urlRouterProvider.otherwise("/");
        }]).run(["tp.ext.ExtensionManager", function (extensionManager) {
            extensionManager.registerExtensions(extensions);
        }]);
})();