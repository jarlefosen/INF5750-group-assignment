define([
  "app",
  "controllers/indexCtrl",
  "controllers/navbarCtrl",
  "controllers/loginCtrl",
  "controllers/messageCtrl"
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

        .when("/login", {
          templateUrl: "partials/login.html",
          controller: "LoginCtrl"
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
