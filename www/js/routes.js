define([
  "app",
  "controllers/loginCtrl",
  "controllers/InboxCtrl",
  "controllers/userCtrl",
  "controllers/messageDetailCtrl",
  "controllers/newMessageCtrl"
], function (app) {
  "use strict";

  app.config([
    "$stateProvider",
    "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/messages");

      $stateProvider
        .state("login", {
          url: "/login",
          templateUrl: "partials/login.html",
          controller: "LoginCtrl"

        })
        .state("messages", {
          url: "/messages",
          templateUrl: "partials/messages.html",
          controller: "InboxCtrl"
        })
        .state("newMessage", {
          url:"/messages/new",
          templateUrl: "partials/newMessage.html",
          controller: "NewMessageCtrl"
        })
        .state("message", {
          url: "/messages/:messageId",
          templateUrl: "partials/messageDetail.html",
          controller: "MessageDetailCtrl"
        })
        .state("users", {
          url: "/users",
          templateUrl: "partials/users.html",
          controller: "UserCtrl"
        });

      /*$routeProvider
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

        .otherwise({
          redirectTo: "/messages"
        });*/
    }
  ]);
});
