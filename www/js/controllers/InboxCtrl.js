define([
  "app",
  "services/messageService",
  "services/loginService",
  "filters/dateFilter",
  "directives/inboxMessage",
  "directives/navbarTop",
  "directives/navbarBottom",
  "directives/messageDetail"
], function (app) {
  "use strict";

  app.controller("InboxCtrl", [
    "$scope", "MessageService", "LoginService",
    function ($scope, MessageService, LoginService) {

      $scope.allMessages = [];
      $scope.currentMessage = {};
      $scope.orderProp = "lastMessage";
      $scope.filterProp = {};

      $scope.setFilter = function(value){
        $scope.filterProp = value;
      };

      $scope.setCurrentMessage = function(message){
        $scope.currentMessage = message;
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
        $scope.setCurrentMessage(messages[0]);
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
    }

  ]);
});
