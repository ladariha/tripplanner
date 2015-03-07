"use strict";
angular.module("tripPlanner.extension")
        .factory("tp.ext.ExtensionSPI", ["$q",
            function ExtensionSPIFactory($q) {

                function ExtensionSPI() {
                    this.name = "";
                    this.cost = 0;
                }

                ExtensionSPI.prototype.goToEdit = function () {};
                ExtensionSPI.prototype.goToCreate = function () {};
                ExtensionSPI.prototype.update = function () {};








                return ExtensionSPI;

            }

        ]);