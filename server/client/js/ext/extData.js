"use strict";
/**
 * Use only to store extension data so view directvies of each extension
 * can later access their data
 * 
 */
angular.module("tripPlanner.dayextension")
        .factory("tp.ext.ExtensionData", ["$rootScope",
            function ExtensionDataFactory($rootScope) {

                var data = {};

                // clear data on each route change
                $rootScope.$on("$stateChangeStart", reset);

                var extensionData = {
                    set: setData,
                    get: getData
                };

                return extensionData;


                /**
                 * Resets data on route change
                 */
                function reset() {
                    data = {};
                }

                function getData(extensionId) {
                    var result = data[extensionId];
                    data[extensionId] = null;
                    return result;
                }

                function setData(extensionId, extensionData) {
                    data[extensionId] = extensionData;
                }

            }
        ]);