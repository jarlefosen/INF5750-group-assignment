define([
  "app"
], function (app) {
  app.controller("NavbarCtrl", [
    "$scope",
    function ($scope) {
      "use strict";

      $scope.message = "This is a navbar";
    }
  ])
});