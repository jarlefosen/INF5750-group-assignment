define([
  "app",
  "controllers/loginCtrl",
  "controllers/InboxCtrl",
  "controllers/userCtrl",
  "controllers/userGroupCtrl",
  "controllers/messageDetailCtrl",
  "controllers/newMessageCtrl"
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

        .when("/messages/new", {
          templateUrl: "partials/newMessage.html",
          controller: "NewMessageCtrl"
        })

        .when("/messages/:messageId", {
          templateUrl: "partials/messageDetail.html",
          controller: "MessageDetailCtrl"
        })
        .when("/users", {
          templateUrl: "partials/users.html",
          controller: "UserCtrl"
        })

        .when("/groups", {
          templateUrl: "partials/groups.html",
          controller: "UserGroupCtrl"
        })

        .otherwise({
          redirectTo: "/messages"
        });
    }
  ]);
});
