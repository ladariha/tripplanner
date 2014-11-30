"use strict";

angular.module("tripPlanner.user")
        .factory("tp.user.UserHandler", ["tp.core.Session", "tp.user.UserCache", "tp.user.UserHttp", "tp.user.UserModel",
            function (Session, UserCache, UserHttp, UserModel) {

                var UserHandler = {
                    getUser: function (userId) {
                        return new Promise(function (resolve, reject) {
                            if (UserCache.get(userId)) {
                                resolve(UserCache.get(userId));
                            } else if (Session.getUser().userId === userId) {
                                resolve(Session.getUser());
                            } else {
                                UserHttp.get(userId).then(function (user) {
                                    var _t = new UserModel();
                                    _t.convertFromServer(user);
                                    UserCache.set(_t);
                                    resolve(_t);

                                }, function (err) {
                                    reject(err);
                                });
                            }
                        });
                    }
                };

                return UserHandler;

            }]);
