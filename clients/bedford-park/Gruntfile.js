module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
        dist: {
          options: {                       // Target options
              style: 'compressed',  
              compass: true
          },
            files: {
            'static/css/site.min.css': 'static/scss/site.scss'
          }
        }
      }
  });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['sass']);
};