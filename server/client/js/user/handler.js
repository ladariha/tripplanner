"use strict";

angular.module("tripPlanner.user")
        .factory("tp.user.UserHandler", ["tp.session.Session", "tp.user.UserCache", "tp.user.UserHttp", "tp.user.UserModel", "$q",
            function UserHandlerFactory(session, userCache, userHttp, UserModel, $q) {


                function UserHandler() {

                }
                UserHandler.prototype.getUser = function (userId) {
                    var deferred = $q.defer();
                    if (userCache.get()) {
                        deferred.resolve(userCache.get());
                    } else if (session.getUser() && session.getUser().userId === userId) {
                        deferred.resolve(session.getUser());
                    } else {
                        userHttp.get(userId).then(function (user) {
                            var _t = new UserModel();
                            _t.convertFromServer(user);
                            userCache.set(_t);
                            deferred.resolve(_t);
                        }, function (err) {
                            deferred.reject(err);
                        });
                    }
                    return deferred.promise;
                };

                return UserHandler;

            }]);
