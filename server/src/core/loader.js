"use strict";

(function loadModules() {
    var modules = ["./listeners", "../misc/shims"];
    modules.forEach(function(mod){
        require(mod); 
    });
})();

module.exports = {};