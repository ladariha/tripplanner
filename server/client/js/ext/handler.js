"use strict";
angular.module("tripPlanner.dayextension")
        .factory("tp.ext.ExtensionManager", ["tp.Core",
            function ExtensionManagerFactory(core) {

                var extensions = null;

                var extensionManager = {
                    registerExtensions: registerExtensions,
                    getExtensions: getExtensions,
                    getCreateState: getCreateState,
                    getEditState: getEditState
                };

                return extensionManager;


                function registerExtensions(exts) {
                    extensions = exts;
                    
                    for(var e in extensions){
                        if(extensions.hasOwnProperty(e)){
                            core.server.addUrl(extensions[e].name, extensions[e].url);
                        }
                    }
                }

                function getCreateState(extensionName) {
                    return extensions[extensionName].states.create;
                }
                function getEditState(extensionName) {
                    return extensions[extensionName].states.edit;
                }

                function getExtensions() {
                    return extensions;
                }
            }
        ]);