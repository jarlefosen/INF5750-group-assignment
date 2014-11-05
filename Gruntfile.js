module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    eslint: {
      target: [
        "Gruntfile.js",
        "www/js/*/*.js",
        "www/js/*.js"
      ]
    }
  });

  grunt.loadNpmTasks("grunt-eslint");


};
