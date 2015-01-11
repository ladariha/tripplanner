"use strict";

angular.module("tripPlanner.user").controller("tp.user.UserCtrl", ["user", "$scope",
    function UserCtrl(user, $scope) {
        $scope.user = user;
    }]);