/**
 * Created by cbbx on 17/11/14.
 */
define([
  "app",
  "services/messageService",
  "services/userService",
  "services/groupService",
  "services/orgUnitService"
], function (app) {
  "use strict";
  app.controller("NewMessageCtrl", [
    "$scope", "$routeParams", "MessageService", "UserService", "GroupService", "OrgUnitService",
    function ($scope, $routeParams, MessageService, UserService, GroupService, OrgUnitService) {
      $scope.NAV_TOP = {
        goToState: "messages",
        displayName: "Back",
        icon: "fa-angle-left",
        showEdit: false
      };

      $scope.userRecipients = [];
      $scope.groupRecipients = [];
      $scope.orgUnitRecipients = [];
      $scope.subject = "";
      $scope.text = "";

      $scope.sendMessage = function () {
        MessageService.newMessage($scope.subject, $scope.text, $scope.userRecipients, $scope.groupRecipients, $scope.orgUnitRecipients);
      };

      UserService.getUsers()
        .then(function (users) {
          $scope.allUsers = users;
        });

      GroupService.getUserGroups()
        .then(function (groups) {
          $scope.allGroups = groups;
        });

      OrgUnitService.getOrgUnits()
        .then(function (orgUnits) {
          $scope.allOrgUnits = orgUnits;
        });
    }
  ]);
});
