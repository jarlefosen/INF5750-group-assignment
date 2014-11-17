define([
  "app",
  "services/messageService",
  "filters/dateFilter",
  "directives/inboxMessage",
  "directives/navbarTop",
  "directives/navbarBottom"
], function (app) {
  "use strict";

  app.controller("InboxCtrl", [
    "$scope", "MessageService",
    function ($scope, MessageService) {
      var dump = [
        {
          "lastUpdated": "2014-11-10T13:38:41.783+0000",
          "followUp": true,
          "id": "J4OMgKb01sO",
          "read": false,
          "subject": "Ebola outbreak",
          "lastSender": {
            "name": "Amund Meisal"
          },
          "messages": [
            {
              "id": "FWPWCIQ3eJb",
              "name": "New Ebola outbreak in Sierra Leone! Help help!"
            }
          ]
        },
        {
          "lastUpdated": "2014-11-10T13:38:41.783+0000",
          "followUp": false,
          "id": "J4OMgKb01sO",
          "read": true,
          "subject": "Ebola outbreak",
          "lastSender": {
            "name": "Amund Meisal"
          },
          "messages": [
            {
              "id": "FWPWCIQ3eJb",
              "name": "New Ebola outbreak in Sierra Leone! Help help!"
            }
          ]
        },
        {
          "lastUpdated": "2014-11-10T13:38:41.783+0000",
          "followUp": false,
          "id": "J4OMgKb01sO",
          "read": false,
          "subject": "Ebola outbreak",
          "lastSender": {
            "name": "Amund Meisal"
          },
          "messages": [
            {
              "id": "FWPWCIQ3eJb",
              "name": "New Ebola outbreak in Sierra Leone! Help help!"
            }
          ]
        }
      ];

      $scope.allMessages = [];

      MessageService.getAllMessages().then(
        function(msgs){
          $scope.messageList = msgs;

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
    }

  ]);
});
