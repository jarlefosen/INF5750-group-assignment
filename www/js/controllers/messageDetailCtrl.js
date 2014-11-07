/**
 * Created by cbbx on 07/11/14.
 */
define([
  "app",
  "../services/messageService"
], function (app) {

  app.controller("MessageDetailCtrl", [
    "$scope", "$routeParams", "MessageService",
    function ($scope, $routeParams, MessageService) {
      "use strict";

      $scope.hei = "hei";
      $scope.message = MessageService.getMessage($routeParams.messageId);
    }
  ])
});
