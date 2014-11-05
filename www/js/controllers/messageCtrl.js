define([
  "app",
  "factories/messageFact"
], function (app) {

  app.controller("MessageCtrl", [
    "$scope", "Messages",
    function ($scope, Messages) {
      "use strict";

      $scope.messages = Messages.get();
    }

  ])
});
