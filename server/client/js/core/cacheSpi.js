"use strict";

angular.module("tripPlanner.core")
        .factory("tp.core.CacheSpi", function Cache() {

            function CacheSpi(){
                this.cache = null;
            }
            CacheSpi.prototype.get = function(){
              return this.cache;  
            };
            CacheSpi.prototype.set = function(obj){
                if(obj !== null && typeof obj !== "undefined"){
                    this.cache = obj;
                }
            };
            CacheSpi.prototype.reset = function(){
                this.cache = null;
            };

            return CacheSpi;
        });