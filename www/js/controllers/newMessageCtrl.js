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

      $scope.user_recipients = []; //Should contain receivers id.
      $scope.subject = "";
      $scope.text = "";

      $scope.sendMessage = function () {
        console.log("receivers: " + $scope.user_recipients.toString());
        MessageService.newMessage($scope.subject, $scope.text, $scope.user_recipients);
      };

      UserService.getUsers()
        .then(function (users) {
          $scope.allUsers = users;
        });

    }
  ])
});
