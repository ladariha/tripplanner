"use strict";
angular.module("tripPlanner.user")
        .factory("tp.user.UserCache", ["tp.core.CacheSpi",
            function UserCacheFactory(Cache) {

                function UserCache() {
                    Cache.call(this);
                }

                UserCache.prototype = Object.create(Cache.prototype);

                return new UserCache();
            }
        ]);