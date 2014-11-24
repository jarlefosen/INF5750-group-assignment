/**
 * Created by cbbx on 17/11/14.
 */
define([
  "app",
  "services/messageService",
  "services/userService",
  "services/groupService"
], function (app) {
  "use strict";
  app.controller("NewMessageCtrl", [
    "$scope", "$routeParams", "MessageService", "UserService", "GroupService",
    function ($scope, $routeParams, MessageService, UserService, GroupService) {

      $scope.userRecipients = []; //Should contain receivers id.
      $scope.groupRecipients = [];
      $scope.subject = "";
      $scope.text = "";

      $scope.sendMessage = function () {
        MessageService.newMessage($scope.subject, $scope.text, $scope.userRecipients, $scope.groupRecipients);
      };

      UserService.getUsers()
        .then(function (users) {
          $scope.allUsers = users;
        });

      GroupService.getUserGroups()
        .then(function (groups) {
          $scope.allGroups = groups;
        });
    }
  ]);
});
