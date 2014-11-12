/**
 * Created by cbbx on 07/11/14.
 */
define([
  "app",
  "../services/messageService"
], function (app) {
  "use strict";
  app.controller("MessageDetailCtrl", [
    "$scope", "$routeParams", "MessageService",
    function ($scope, $routeParams, MessageService) {
      $scope.message = MessageService.getMessage($routeParams.messageId);
    }
  ]);
});
