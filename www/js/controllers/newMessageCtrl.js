/**
 * Created by cbbx on 17/11/14.
 */
define([
  "app",
  "services/messageService",
  "services/userService"
], function (app) {
  "use strict";
  app.controller("NewMessageCtrl", [
    "$scope", "$routeParams", "MessageService", "UserService",
    function ($scope, $routeParams, MessageService, UserService) {

      $scope.userRecipients = []; //Should contain receivers id.
      $scope.subject = "";
      $scope.text = "";

      $scope.sendMessage = function () {
        MessageService.newMessage($scope.subject, $scope.text, $scope.userRecipients);
      };

      UserService.getUsers()
        .then(function (users) {
          $scope.allUsers = users;
        });

    }
  ]);
});
