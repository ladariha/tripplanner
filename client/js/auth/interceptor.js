"use strict";

angular.module("tripPlanner.auth")
        .factory("tp.auth.LocationInterceptor", ["$rootScope", "$state", "tp.session.Session", "$timeout",
            function LocationInterceptor($rootScope, $state, Session, $timeout) {

                var PROTECTED_STATES = ["trip.new", "trip.edit"];
                var waitingForLogin = false;
                var cancelledState = null;
                var cancelledParams = null;

                function stateChangeStart(event, toState, fromState, fromParams) {
                    if (PROTECTED_STATES.indexOf(toState.name) > -1 && !Session.getUser()) {
                        waitingForLogin = true;
                        cancelledState = toState.name;
                        cancelledParams = fromParams;
                        event.preventDefault();
                        $state.go("login");
                    }
                }

                function userLoggedIn() {
                    if (waitingForLogin) {
                        $timeout(function () {
                            $rootScope.$apply(function () {
                                $state.go(cancelledState);
                            });
                        });
                        waitingForLogin = false;
                    }
                }


                $rootScope.$on("$stateChangeStart", stateChangeStart);
                $rootScope.$on("userLoggedIn", userLoggedIn);

                return {};
            }]);