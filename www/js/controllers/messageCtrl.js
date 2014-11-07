define([
  "app",
  "../services/messageService"
], function (app) {
  "use strict";

  app.controller("MessageCtrl", [
    "$scope", "MessageService",
    function ($scope, MessageService) {

      $scope.messages = MessageService.getAllMessages();
    }

  ]);
});
