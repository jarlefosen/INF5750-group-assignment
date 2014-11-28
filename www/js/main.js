require.config({
  paths: {
    "angular": "../bower_components/angular/angular",
    "angular-resource": "../bower_components/angular-resource/angular-resource",
    "angular-route": "../bower_components/angular-route/angular-route",
    "angular-animate": "../bower_components/angular-animate/angular-animate",
    "angular-ui-router": "../bower_components/angular-ui-router/release/angular-ui-router",
    "scrollglue": "../bower_components/angularjs-scroll-glue/src/scrollglue"
  },
  shim: {
    "angular": {exports: "angular"},
    "angular-route": ["angular"],
    "angular-resource": ["angular"],
    "angular-animate": ["angular"],
    "angular-ui-router": {
      deps: ["angular"]
    },
    "scrollglue": {
      deps: ["angular"]
    }
  }
});

require([
  "angular",
  "app",
  "routes"
], function (angular, app) {
  "use strict";

  /* Will launch on app startup */
  function bootstrap() {
    app.run();
    angular.bootstrap(document, ["app"]);
  }

  /* If running on Cordova, wait for device ready to bootstrap */
  if (window.cordova) {
    document.addEventListener("deviceready", bootstrap, false);
  } else {
    bootstrap();
  }

});
