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
    "$scope", "$window", "$location", "MessageService", "LoginService", "$state", "$rootScope",
    function ($scope, $window, $location, MessageService, LoginService, $state, $rootScope) {
      $scope.NAV_TOP = {
        goToState: "newMessage",
        displayName: "New message",
        icon: "fa-plus",
        showEdit: true
      };

      $scope.state = $state.$current.self;
      $rootScope.$on("$stateChangeSuccess", function(event, toState) {
        $scope.state = toState;
      });

      $scope.allMessages = [];
      $scope.currentMessage = {};
      $scope.orderProp = "lastMessage";
      $scope.filterProp = {};

      $scope.setFilter = function(value){
        $scope.filterProp = value;
      };

      $scope.goToMessage = function(message){
        $scope.currentMessage = message;
        $state.go("messages.view", {messageId: message.id});
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
    }

  ]);
});
