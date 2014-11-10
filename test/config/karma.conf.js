module.exports = function(config) {
  "use strict";

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "../../",


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine", "requirejs"],


    // list of files / patterns to load in the browser
    files: [
      {pattern: "www/js/*.js", included: false},
      {pattern: "www/js/**/*.js", included: false},
      {pattern: "www/bower_components/**/*.js", included: false},
      {pattern: "test/unit/**/*.spec.js", included: false},

      "test/config/require.conf.js"
    ],


    // list of files to exclude
    exclude: [
      "www/js/main.js",
      "www/js/routes.js"
    ],

    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],

    plugins: [
      "karma-jasmine",
      "karma-requirejs",
      "karma-junit-reporter",
      "karma-phantomjs-launcher"
    ],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Server timeout - if no browsers are captured in 60 seconds
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
