module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    shell: {
      cordova: {
        command: function() {
          return [
            "cordova plugin add org.apache.cordova.console",
            "cordova platform add android",
            "cordova platform add ios"
          ].join(";");
        }
      },
      android: {
        command: "cordova run android --device"
      },
      "android-emulate": {
        command: "cordova emulate android"
      },
      ios: {
        command: "cordova run ios"
      },
      "ios-emulate": {
        command: "cordova emulate ios"
      }
    },
    eslint: {
      target: [
        "Gruntfile.js",
        "www/js/*/*.js",
        "www/js/*.js"
      ]
    }
  });

  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-shell");

  grunt.registerTask("cordova", ["shell:cordova"]);
  grunt.registerTask("android", ["shell:android"]);
  grunt.registerTask("android-emulator", ["shell:android-emulate"]);
  grunt.registerTask("ios", ["shell:ios"]);
  grunt.registerTask("ios-emulator", ["shell:ios-emulate"]);

};
