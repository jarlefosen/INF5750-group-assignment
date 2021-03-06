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
          views: {
            "": {
              templateUrl: "partials/messages.html",
              controller: "InboxCtrl"
            }
          }
        })
        .state("messages.view", {
          url: "/view/:messageId",
          views: {
            "detail": {
              templateUrl: "partials/messageDetail.html",
              controller: "MessageDetailCtrl"
            }
          }
        })
        .state("newMessage", {
          url: "/messages/new",
          templateUrl: "partials/newMessage.html",
          controller: "NewMessageCtrl"
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
          url: "/orgunits",
          templateUrl: "partials/orgunits.html",
          controller: "OrgUnitCtrl"
        });
    }
  ]);
});
