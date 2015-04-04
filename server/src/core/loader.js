"use strict";

(function loadModules() {
    var modules = ["./listeners", "../misc/sanitizer"];
    modules.forEach(function(mod){
        require(mod); 
    });
})();

module.exports = {};