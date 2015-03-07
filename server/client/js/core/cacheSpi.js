"use strict";

angular.module("tripPlanner.core")
        .factory("tp.core.CacheSPI", function Cache() {

            function CacheSPI(){
                this.cache = null;
            }
            CacheSPI.prototype.get = function(){
              return this.cache;  
            };
            CacheSPI.prototype.set = function(obj){
                if(obj !== null && typeof obj !== "undefined"){
                    this.cache = obj;
                }
            };
            CacheSPI.prototype.reset = function(){
                this.cache = null;
            };

            return CacheSPI;
        });