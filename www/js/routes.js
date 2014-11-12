define([
  "app",
  "controllers/indexCtrl",
  "controllers/navbarCtrl",
  "controllers/loginCtrl",
  "controllers/messageCtrl",
  "controllers/messageDetailCtrl"
], function (app) {
  "use strict";

  app.config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider
        .when("/login", {
          templateUrl: "partials/login.html",
          controller: "LoginCtrl"
        })

        .when("/messages", {
          templateUrl: "partials/messages.html",
          controller: "MessageCtrl"
        })

        .when("/messages/:messageId", {
          templateUrl: "partials/messageDetail.html",
          controller: "MessageDetailCtrl"
        })

        .otherwise({
          redirectTo: "/messages"
        });
    }
  ]);
});
