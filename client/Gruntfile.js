module.exports = function(grunt) {
    "use strict";
    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        jshint: {
            "client": {
                "src": ["src/js/**/*.js"],
                options: {
                    "force": true,
                    "strict": true,
                    "curly": true,
                    "eqnull": true,
                    "unused": true,
                    "eqeqeq": true,
                    "undef": true,
                    "camelcase": true,
                    "forin": true,
                    "immed": true,
                    "latedef": true,
                    "newcap": true,
                    "quotmark": "double",
                    "trailing": true,
//                 "globalstrict": true,//
                    "globals": {angular: true, window: true, google: true, Promise: true, hello : true},
                    "reporter": require('jshint-stylish'),
                    '-W097': true // use strict in function form warning
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
