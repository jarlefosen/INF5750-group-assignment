require.config({
  paths: {
    "angular": "libs/angular/angular",
    "angular-resource": "libs/angular-resource/angular-resource",
    "angular-route": "libs/angular-route/angular-route"
  },
  shim: {
    "angular": { exports: "angular" },
    "angular-route" : ["angular"],
    "angular-resource": ["angular"]
  }
});

require([
  "angular",
  "app",
  "routes"
], function(angular, app) {
  "use strict";

  /* Will launch on app startup */
  function bootstrap() {
    app.run();
    angular.bootstrap(document, ["app"]);
  }

  /* If running on Cordova, wait for device ready to bootstrap */
  if (!!window.cordova) {
    document.addEventListener("deviceready", bootstrap, false);
  } else {
    bootstrap();
  }

});
