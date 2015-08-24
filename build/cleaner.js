module.exports = function (grunt) {
    var _ = require('underscore');
    var assets = [],
            links = [],
            regex = new RegExp('(?:href|src|url)[\=\(][\'"](?!(?:http|#|\s|"))(.+?(?=jpg|png|mp4|pdf|js)?)[\'"]', 'ig');

    grunt.registerTask('grunt-cleaner', function () {
        getAssetsArray();
    });

    // get list of all assets
    function getAssetsArray() {
        grunt.file.expand({
            filter: 'isFile',
            cwd: 'client'
        }, ['libs/**/*']).forEach(function (file) {
            assets.push(file);
        });
        console.log(assets.length);
        getLinkedAssets(assets);
    }

    // find links to assets in content
    function getLinkedAssets(assets) {
        grunt.file.expand({
            filter: 'isFile',
            cwd: 'client'
        }, ['**/*.html', '**/*.js', '**/*.css']).forEach(function (file) {
            var content = grunt.file.read('client/' + file);
            while ((result = regex.exec(content)) !== null) {
                links.push(result[1]);
            }
        });
        removeAssets(assets, links);
    }

    // remove unused assets
    function removeAssets() {
        var remove = _.difference(assets, links);
        remove.forEach(function (el) {
            grunt.file.delete('client/' + el);
        });
    }

};