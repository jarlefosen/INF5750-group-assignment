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
    "$scope", "$routeParams", "MessageService", "UserService", "GroupService", "OrgUnitService", "$location",
    function ($scope, $routeParams, MessageService, UserService, GroupService, OrgUnitService, $location) {
      $scope.NAV_TOP = {
        goToState: "messages",
        displayName: "Back",
        icon: "fa-angle-left",
        showEdit: false
      };

      $scope.newMessage = {};

      $scope.userRecipients = [];
      $scope.groupRecipients = [];
      $scope.orgUnitRecipients = [];

      $scope.selectorOptions = {};
      $scope.carouselRunning = false;

      $scope.setCarouselState = function(){
        $scope.carouselRunning = !$scope.carouselRunning;
      };

      $scope.updateSelector = function(type) {
        $scope.selectorOptions.type = type;
        $scope.setCarouselState();
      };

      $scope.sendMessage = function () {
        MessageService.newMessage(
          $scope.newMessage.subject,
          $scope.newMessage.text,
          getIds($scope.userRecipients),
          getIds($scope.groupRecipients),
          getIds($scope.orgUnitRecipients))
          .then(function(){
            $location.path("/messages");
          });
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

      $scope.addRecipient = function(recipient, type){
        switch (type){
          case  'user':
            if(!alreadyAdded($scope.userRecipients, recipient)){
              $scope.userRecipients.push(recipient);
            }
            break;
          case 'group':
            if(!alreadyAdded($scope.groupRecipients, recipient)){
              $scope.groupRecipients.push(recipient);
            }
            break;
          case 'orgUnit':
            if(!alreadyAdded($scope.orgUnitRecipients, recipient)){
              $scope.orgUnitRecipients.push(recipient);
            }
            break;
          default:
            console.log('Invalid');
            break;
        }
      };

      $scope.removeRecipient = function(recipient, type){
        switch(type){
          case  'user':
            if(alreadyAdded($scope.userRecipients, recipient)){
              var ui = $scope.userRecipients.indexOf(recipient);
              $scope.userRecipients.splice(ui, 1);
            }
            break;
          case  'group':
            if(alreadyAdded($scope.groupRecipients, recipient)){
              var gi = $scope.groupRecipients.indexOf(recipient);
              $scope.groupRecipients.splice(gi, 1);
            }
            break;
          case  'orgUnit':
            if(alreadyAdded($scope.orgUnitRecipients, recipient)){
              var oi = $scope.orgUnitRecipients.indexOf(recipient);
              $scope.orgUnitRecipients.splice(oi, 1);
            }
            break;
          default:
            console.log("Invalid");
        }
      };

      function alreadyAdded(array, obj){
        if(array.indexOf(obj) > -1){
          return true;
        }else{
          return false;
        }
      }

      function getIds(objects){
        var IDs = [];
        for(var index in objects){
          IDs.push(objects[index].id);
        }
        return IDs;
      }
    }
  ]);
});
