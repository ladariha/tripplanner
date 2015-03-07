"use strict";
angular.module("tripPlanner.extension")
        .factory("tp.ext.ExtensionManager", ["$q",
            function ExtensionManagerFactory($q) {

                var extensions = null;

                var extensionManager = {
                    registerExtensions: registerExtensions

                };

                return extensionManager;

                function registerExtensions(exts) {
                    extensions = exts;
                }
            }
        ]);