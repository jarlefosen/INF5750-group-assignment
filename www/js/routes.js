define([
  "app",
  "controllers/indexCtrl",
  "controllers/messageCtrl",
  "controllers/navbarCtrl"
], function (app) {
  "use strict";

  app.config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider
        .when("/", {
          templateUrl: "partials/index.html",
          controller: "IndexCtrl"
        })

        .when("/messages", {
          templateUrl: "partials/messages.html",
          controller: "MessageCtrl"
        })

        .otherwise({
          redirectTo: "/"
        });
    }
  ]);
});
