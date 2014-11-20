define([
  "app",
  "controllers/loginCtrl",
  "controllers/InboxCtrl",
  "controllers/userCtrl",
  "controllers/userGroupCtrl",
  "controllers/orgUnitCtrl",
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
          url: "/messages/new",
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
        })
        .state("groups", {
          url: "/groups",
          templateUrl: "partials/groups.html",
          controller: "UserGroupCtrl"
        })
        .state("orgUnits", {
          url: "/orgUnits",
          templateUrl: "partials/orgUnits.html",
          controller: "OrgUnitCtrl"
        });
    }
  ]);
});
