module.exports = function (grunt) {
    "use strict";
    require('time-grunt')(grunt);
    grunt.initConfig({
        jshint: {
            "server": {
                "src": ["src/**/*.js"],
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
                    "globals": {angular: true, window: true, google: true, exports: true, require: true, Promise : true},
                    "reporter": require('jshint-stylish'),
                    '-W097': true // use strict in function form warning
                }
            },
            "client": {
                "src": ["client/js/**/*.js"],
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
                    "latedef": "nofunc",
                    "newcap": true,
                    "quotmark": "double",
                    "trailing": true,
//                 "globalstrict": true,//
                    "globals": {angular: true, window: true, google: true, Promise: true, hello: true, $: true, XMLHttpRequest : true},
                    "reporter": require('jshint-stylish'),
                    '-W097': true // use strict in function form warning
                }
            }
        },
        plato: {
            "default": {
                options: {
                    "jshint": grunt.file.readJSON('.jshintrc'),
                    "exclude": /\.min\.js$/ 
                },
                files: {
                    "../report": ["client/js/**/*.js", "src/**/*.js"]
                }
            }
        }
    });
    grunt.loadTasks('./build');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-plato');
    grunt.registerTask("jshint-client", ["jshint:client"]);
    grunt.registerTask("jshint-server", ["jshint:server"]);
};
