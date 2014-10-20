define([
  "app",
  "controllers/index-controller"
], function(app) {
  "use strict";

  app.config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider
      .when("/", {
        templateUrl: "partials/index.html",
        controller: "IndexController"
      })
      .otherwise({
        redirectTo: "/"
      });
    }
  ]);
});
