module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          javascripts: {
            files: {
                'js/scripts.min.js' : 
                [
                    'lib/js/working/angular.js',
                    'lib/js/working/jquery.js',
                    'lib/js/working/bootstrap.js',
                    'lib/js/working/mediaQueries.js'
                ]
            }
          }
        },
        sass: {
            dist: {
              options: {
                style: 'compressed',
                compass: true
              },
              files: {
                'lib/css/style.css': 'lib/css/scss/style.scss',
              }
            }
          },
          imagemin: { 
            dynamic: {
              files: [{
                expand: true,
                cwd: 'lib/images/working',
                src: ['**/*.{png,jpg,gif}'], 
                dest: 'lib/images/no-touching'
              }]
            }
          },
            watch: {
            scripts: {
                files: 'lib/js/working/*.js',
                tasks: ['uglify']
            },
            css: {
                files: 'lib/css/scss/*.scss',
                tasks: ['sass'],
            }
        },
        favicons: {
            options: {},
            icons: {
              src: 'lib/images/working/icon.png',
              dest: 'lib/images'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-favicons');

    // Default task(s).
    grunt.registerTask('default', ['watch', 'imagemin']);
};