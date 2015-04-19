"use strict";

angular.module("tripPlanner.dayextension")
        .directive("tpDayExtension", ["$compile", function ($compile) {
                var PREFIX = "tp-ext-day";
                return {
                    restrict: 'E',
                    scope: {
                        'name': '@',
                        "extId": '@'
                    },
                    link: function (scope, element, attributes) {
                        var template = '<' + PREFIX + "." + scope.name + ' ext-id="' + attributes.extid +'" />';
                        var compiled = $compile(template)(scope);
                        element.append(compiled);
                    }
                };
            }]);