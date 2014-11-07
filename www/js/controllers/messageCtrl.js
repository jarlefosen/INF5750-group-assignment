define([
  "app",
  "../services/messageService"
], function (app) {

  app.controller("MessageCtrl", [
    "$scope", "MessageService",
    function ($scope, MessageService) {
      "use strict";

      $scope.messages = MessageService.getAllMessages();
    }

  ]);
});
