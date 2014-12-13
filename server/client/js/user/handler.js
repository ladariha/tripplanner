"use strict";

angular.module("tripPlanner.user")
        .factory("tp.user.UserHandler", ["tp.session.Session", "tp.user.UserCache", "tp.user.UserHttp", "tp.user.UserModel", "$q",
            function (Session, UserCache, UserHttp, UserModel, $q) {

                var UserHandler = {
                    getUser: function (userId) {
                        var deferred = $q.defer();
                        if (UserCache.get(userId)) {
                            deferred.resolve(UserCache.get(userId));
                        } else if (Session.getUser() && Session.getUser().userId === userId) {
                            deferred.resolve(Session.getUser());
                        } else {
                            UserHttp.get(userId).then(function (user) {
                                var _t = new UserModel();
                                _t.convertFromServer(user);
                                UserCache.set(_t);
                                deferred.resolve(_t);
                            }, function (err) {
                                deferred.reject(err);
                            });
                        }
                        return deferred.promise;
                    }
                };

                return UserHandler;

            }]);
