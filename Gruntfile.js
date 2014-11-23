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
    },
    "html-validation": {
      options: {
        reset: grunt.option('reset') || true,
        stoponerror: false,
        relaxerror: [
          "Bad value X-UA-Compatible for attribute http-equiv on element meta.",
          "no document type declaration; will parse without validation"
        ] //ignores these errors
      },
      files: {
        src: [
          'www/*.html',
          'www/partials/*.html'
        ]
      }
    },
    "css-validation": {
      options: {
        reset: grunt.option('reset') || false,
        stoponerror:false,
        relaxerror: [],
        profile: 'css3', // possible profiles are: none, css1, css2, css21, css3, svg, svgbasic, svgtiny, mobile, atsc-tv, tv
        medium: 'all', // possible media are: all, aural, braille, embossed, handheld, print, projection, screen, tty, tv, presentation
        warnings: '0' // possible warnings are: 2 (all), 1 (normal), 0 (most important), no (no warnings)
      },
      files: {
        src: ['www/css/*.css']
      }
    },
    htmlangular: {
      options: {
        tmplext: 'html',
        customtags: [
          // <message-detail ></message-detail> is a custom tag
          'message-detail'
        ],
        customattrs: [
          //<div message-id="123"></div> -> message-id would be a custom attribute
        ],
        relaxerror: [
          'The frameborder attribute on the iframe element is obsolete. Use CSS instead.'
        ],
        reportpath: 'html-angular-validate-report.json'
      },
      files: {
        src: [
          'www/partials/*.html'
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks('grunt-w3c-validation');
  grunt.loadNpmTasks('grunt-html-angular-validate');

  grunt.registerTask("test", ["karma:test"]);
  grunt.registerTask("test:fast", ["karma:fast"]);
  grunt.registerTask("validation", ["html-validation","css-validation"]);
  grunt.registerTask("html-angular-validation", ["htmlangular"]);


};
