define([
  "app",
  "controllers/indexCtrl",
  "controllers/navbarCtrl",
  "controllers/loginCtrl"
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
          templateUrl: "partials/login.html",
          controller: "LoginCtrl"
        })
        .otherwise({
          redirectTo: "/"
        });
    }
  ]);
});
