/**
 * Created by cbbx on 07/11/14.
 */
define([
  "app",
  "services/messageService"
], function (app) {
  "use strict";
  app.controller("MessageDetailCtrl", [
    "$scope", "$stateParams", "MessageService",
    function ($scope, $stateParams, MessageService) {
      $scope.test = $stateParams.messageId;
      MessageService.getMessage($stateParams.messageId)
        .then(function(message){
          $scope.message = message;
        });
    }
  ]);
});
