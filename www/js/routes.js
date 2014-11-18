define([
  "app",
  "controllers/loginCtrl",
  "controllers/InboxCtrl",
  "controllers/userCtrl",
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
          controller: "InboxCtrl"
        })

        .when("/messages/:messageId", {
          templateUrl: "partials/messageDetail.html",
          controller: "MessageDetailCtrl"
        })
        .when("/users", {
          templateUrl: "partials/users.html",
          controller: "UserCtrl"
        })

        .otherwise({
          redirectTo: "/messages"
        });
    }
  ]);
});
