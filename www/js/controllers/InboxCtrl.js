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

      var registeredListeners = [];

      $scope.$on("$destroy", function() {
        registeredListeners.forEach(function (listener) {
          /* Call listeners will unbind it */
          listener();
        })
      });

      $scope.NAV_TOP = {
        goToState: "newMessage",
        displayName: "New message",
        icon: "fa-plus",
        showEdit: true
      };

      $scope.state = $state.$current.self;

      var stateListener = $rootScope.$on("$stateChangeSuccess", function(event, toState) {
        $scope.state = toState;
      });

      registeredListeners.push(stateListener);

      var messageListener = $rootScope.$on("message:read", function(event, id, status) {
        for(var i = 0; i < $scope.allMessages.length; i++) {
          if ($scope.allMessages[i].id == id) {
            $scope.allMessages[i].read = status;
          }
        }
      });
      registeredListeners.push(messageListener);

      $scope.allMessages = [];
      $scope.currentMessage = {};
      $scope.orderProp = "lastMessage";
      $scope.filterProp = {};

      $scope.setFilter = function(value){
        $scope.filterProp = value;
      };

      $scope.goToMessage = function(message){

        if(message.read == false) {
          MessageService.markAsRead(message.id);
        }

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
