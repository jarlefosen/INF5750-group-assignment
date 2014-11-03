define([
  "app",
  "controllers/indexCtrl",
  "controllers/navbarCtrl"
], function(app) {
  "use strict";

  app.config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "partials/index.html",
          controller: "IndexCtrl"
        })
        .when("/login", {
          templateUrl: "partials/login.html"
        })
        .otherwise({
          redirectTo: "/"
        });
    }
  ]);
});
