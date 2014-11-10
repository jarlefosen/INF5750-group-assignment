module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    eslint: {
      target: [
        "Gruntfile.js",
        "www/js/*/*.js",
        "www/js/*.js",
        "test/unit/*.js",
        "test/unit/**/*.js"
      ]
    },
    karma: {
      test: {
        configFile: "test/config/karma.conf.js"
      },
      fast: {
        browsers: ["PhantomJS"],
        singleRun: true,
        configFile: "test/config/karma.conf.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-karma");

  grunt.registerTask("test", ["karma:test"]);
  grunt.registerTask("test:fast", ["karma:fast"]);

};
