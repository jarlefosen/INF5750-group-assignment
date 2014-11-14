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
          $scope.user_profile = profile;
        }
      );

      MessageService.getAllMessages().then(
        function(msgs){
          angular.forEach(msgs.messageConversations, function(value){

            MessageService.getMessage(value.id).then(
              function(data){
                $scope.allMessages.push(updateObj(data));
              }, function(error){}
            );
          });
        }, function(error){
        }
      );

      $scope.delMessage = function(messageId){
        MessageService.delMessage(messageId).then(
          function(){
            // Should update list of messages in inbox.
          }
        );
      };


      function updateObj(data){
        angular.forEach(data.userMessages, function(value){
          if(value.user.id === $scope.user_profile.id){
            console.log("YEYE");
            data.isRead = value.read;
            data.isStarred = value.followUp;
          }
        });
        return data;
      };
    }
  ]);
});
