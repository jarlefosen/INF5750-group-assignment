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

      $scope.delMessage = function(message){
        MessageService.deleteMessage(message.id).then(
          function(){
            $scope.allMessages = $scope.allMessages.filter(function(el){
              return el.id !== message.id;
            });
            var delIndex = $scope.allMessages.indexOf(message);
            var newIndex = delIndex > 0 ? delIndex - 1 : delIndex + 1;
            $scope.currentMessage = $scope.allMessages[newIndex];
          }
        );
      };

      $scope.setUnread = function(message) {
        MessageService.setUnread(message.id)
          .then(function() {
            message.read = false;
          });
      };

      $scope.setFollowUp = function(message){

        message.followUp = !message.followUp;
        MessageService.setFollowUp(message);
      };

      $scope.followUpStatus = function(message) {

        if (message.followUp === true) {

          return "follow-up";
        } else {

          return "";
        }
      };
    }

  ]);
});
