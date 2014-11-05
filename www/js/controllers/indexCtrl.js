define([
  "app"
], function (app) {
  app.controller("IndexCtrl", [
    "$scope",
    function ($scope) {
      "use strict";

      $scope.title = "Hello world";
    }
  ])
});
