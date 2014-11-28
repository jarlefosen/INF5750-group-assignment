/**
 * Created by cbbx on 07/11/14.
 */
define([
  "app",
  "services/messageService",
  "directives/navbarTop",
  "directives/scrollSpy"
], function (app) {
  "use strict";
  app.controller("MessageDetailCtrl", [
    "$scope", "$stateParams", "MessageService", "$state",
    function ($scope, $stateParams, MessageService, $state) {
      $scope.NAV_TOP = {
        goToState: "messages",
        displayName: "Back",
        icon: "fa-angle-left",
        showEdit: false
      };

      $scope.message = MessageService.getMessageFromCache($stateParams.messageId);
      $scope.messageId = $stateParams.messageId;

      $scope.reply = function (id, content) {
        MessageService.reply(id, content)
          .then(
          function() {
            $state.reload();
          },
          function() {
          }
        );
      };

      MessageService.getMessage($stateParams.messageId)
        .then(function(message){
          $scope.message = message;
        });
    }
  ]);
});
