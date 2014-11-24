define([
  "app",
  "services/messageService",
  "services/loginService",
  "filters/dateFilter",
  "directives/inboxMessage",
  "directives/navbarTop",
  "directives/navbarBottom",
  "directives/messageDetail",
  "directives/editBtnClickHandler"
], function (app) {
  "use strict";

  app.controller("InboxCtrl", [
    "$scope", "$window", "$location", "MessageService", "LoginService",
    function ($scope, $window, $location, MessageService, LoginService) {
      $scope.NAV_TOP = {
        goToState: "newMessage",
        displayName: "New message",
        icon: "fa-plus",
        showEdit: true
      };

      $scope.allMessages = [];
      $scope.currentMessage = {};
      $scope.orderProp = "lastMessage";
      $scope.filterProp = {};

      $scope.setFilter = function(value){
        $scope.filterProp = value;
      };

      $scope.goToMessage = function(message){
        if($window.innerWidth >= 992){
          $scope.currentMessage = message;
        }else{
          $location.path("/messages/" + message.id);
        }
      };

      LoginService.getProfile().then(
        function(profile){
          $scope.userProfile = profile;
        }
      );

      function getMessageContent(messages) {
        messages.forEach(function(element) {
          MessageService.getMessage(element.id, element.lastUpdated)
            .then(function(conversation) {
              element.messages = conversation.messages;
              element.userMessages = conversation.userMessages;
            });
        });
        // Setting default active message
        $scope.currentMessage = messages[0];
      }

      MessageService.getAllMessages().then(
        function(msgs) {
          $scope.allMessages = msgs;
          getMessageContent($scope.allMessages);
        });

      $scope.delMessage = function(messageId){
        MessageService.delMessage(messageId).then(
          function(){
            // Should update list of messages in inbox.
          }
        );
      };

      $scope.setFollowUp = function(message){

        message.followUp = !message.followUp;
        MessageService.setFollowUp(message);
      }

      $scope.followUpStatus = function(message) {

        if (message.followUp === true) {

          return "follow-up";
        } else {

          return "";
        }
      }

      function updateObj(data){
        angular.forEach(data.userMessages, function(value){
          if(value.user.id === $scope.userProfile.id){
            data.isRead = value.read;
            data.isStarred = value.followUp;
          }
        });
        return data;
      }
    }

  ]);
});
