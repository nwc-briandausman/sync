module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
              files: {
                'css/style.min.css': 'scss/style.scss'
              }
            },
            options: {
                compass: true,
                style: 'compressed',
                update: true,
                sourcemap: true
            }
        },
        uglify: {
            options: {
              mangle: false,
              beautify: true
            },
            buildJS: {
                files: {
                  'js/global.min.js': [ 'js/jquery.min.js', 
                                        'js/modernizr.custom.87724.js',
                                        'js/angular.min.js', 
                                        'js/bootstrap.js', 
                                        'js/util/nwc-mediaQuery.js',
                                        'js/util/nwc-toggleNext.js',
                                        'js/util/nwc-mobileMenu.js',
                                        'js/util/nwc-googleAnalytics.js',
                                        'js/directives/nwc-retinaReplace.js',
                                        'js/directives/nwc-onScroll.js',
                                        'js/directives/nwc-scrollToTop.js',
                                        'js/directives/nwc-svgReplace.js',
                                        'js/scripts.js',
                                        'js/directives/nwc-storeLocator.js']
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'images/src/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'images'                  // Destination path prefix
              }]    
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');  
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    
    // Default task(s).
    grunt.registerTask('default', ['newer:uglify', 'sass', 'imagemin']);
};