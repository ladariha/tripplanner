"use strict";

angular.module("tripPlanner.dayextension")
        .directive("tpAddExtension", ["tp.ext.ExtensionManager", "$state", function (extensionManager, $state) {

                var plainExts = [];
                var allExtensions = extensionManager.getExtensions();
                var tripDay;
                
                for (var e in allExtensions) {
                    if(allExtensions.hasOwnProperty(e)){
                        plainExts.push({displayName : allExtensions[e].displayName, name : allExtensions[e].name});
                    }
                }
                
                
                function goToCreate(extensionName){
                    $state.go(allExtensions[extensionName].states.create.name, {tripDay: tripDay});
                }
                
                return {
                    restrict: "E",
                    scope: {
                         day: "=day"
                    },
                    controller: function ($scope) {
                        $scope.extensions = plainExts;
                        $scope.goToCreate = goToCreate;
                        tripDay = $scope.day;
                    },
                    templateUrl: "js/ext/addDirective.html"
                };

            }]);