/**
 * Created by cbbx on 07/11/14.
 */
define([
  "app",
  "services/messageService",
  "directives/navbarTop"
], function (app) {
  "use strict";
  app.controller("MessageDetailCtrl", [
    "$scope", "$stateParams", "MessageService",
    function ($scope, $stateParams, MessageService) {
      $scope.NAV_TOP = {
        goToState: "messages",
        displayName: "Back",
        icon: "fa-angle-left",
        showEdit: false
      };
      MessageService.getMessage($stateParams.messageId)
        .then(function(message){
          $scope.message = message;
        });
    }
  ]);
});
