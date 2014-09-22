module.exports = function(grunt) {
    "use strict";
    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        jshint: {
            "server": {
                "src": ["app/**/*.js"],
                options: {
                    strict: true,
                    "curly": true,
                    "eqnull": true,
                    "unused": true,
                    "eqeqeq": true,
                    "undef": true,
                    "camelcase": true,
                    "forin": true,
                    "immed": true,
                    "node": true,
                    "latedef": true,
                    "newcap": true,
                    "quotmark": "double",
                    "trailing": true,
//                 "globalstrict": true,//
                    "globals": {angular: true, window: true, google: true, exports: true, require: true},
                    "reporter": require('jshint-stylish'),
                    '-W097': true // use strict in function form warning
                }
            }



        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
