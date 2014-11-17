define([
  "app",
  "services/messageService",
  "services/loginService",
  "filters/dateFilter",
  "directives/inboxMessage",
  "directives/navbarTop",
  "directives/navbarBottom"
], function (app) {
  "use strict";

  app.controller("InboxCtrl", [
    "$scope", "MessageService", "LoginService",
    function ($scope, MessageService, LoginService) {
      $scope.allMessages = [];
      LoginService.getProfile().then(
        function(profile){
          $scope.userProfile = profile;
        }
      );

      function getMessageContent(messages) {
        messages.forEach(function(element) {
          MessageService.getMessage(element.id)
            .then(function(conversation) {
              element.messages = conversation.messages;
            });
        });
      }

      MessageService.getAllMessages().then(
        function(msgs) {

          $scope.allMessages = msgs;
          getMessageContent($scope.allMessages);
          /*
           angular.forEach(msgs.messageConversations, function(value){

           MessageService.getMessage(value.id).then(
           function(data){
           $scope.allMessages.push(updateObj(data));
           }, function(){}
           );
           });
           }, function(){}
           */
        }
      );

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
