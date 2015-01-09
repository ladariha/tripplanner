"use strict";

angular.module("tripPlanner.auth")
        .factory("tp.auth.LocationInterceptor", ["$rootScope", "$state", "tp.session.Session", "$timeout", "$stateParams",
            function ($rootScope, $state, Session, $timeout, $stateParams) {

                var PROTECTED_STATES = ["trip.new", "trip.edit"];
                var waitingForLogin = false;
                var cancelledState = null;
                var cancelledParams = null;
                var e = $stateParams;
                $rootScope.$on("$stateChangeStart", function (event, toState, fromState, fromParams) {
                    if (PROTECTED_STATES.indexOf(toState.name) > -1 && !Session.getUser()) {
                        waitingForLogin = true;
                        cancelledState = toState.name;
                        cancelledParams = fromParams;
                        event.preventDefault();
                        $state.go("login");
                    }
                });

                $rootScope.$on("userLoggedIn", function (d) {
                    if (waitingForLogin) {
                        $timeout(function () {
                            $rootScope.$apply(function () {
                                $state.go(cancelledState);
                            });
                        });
                        waitingForLogin = false;
                    }
                });

                return {};
            }]);