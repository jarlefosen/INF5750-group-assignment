define([
  "app",
  "../services/messageService",
  "filters/dateFilter",
  "directives/inboxMessage",
  "directives/navbarTop",
  "directives/navbarBottom"
], function (app) {
  "use strict";

  app.controller("InboxCtrl", [
    "$scope", "MessageService",
    function ($scope, MessageService) {
      $scope.allMessages = [];

      MessageService.getAllMessages().then(
        function(msgs){
          angular.forEach(msgs.messageConversations, function(value){

            MessageService.getMessage(value.id).then(
              function(data){
                $scope.allMessages.push(data);
              }, function(){
              }
            );
          });
        }, function(){
          $scope.messageList = "";
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
