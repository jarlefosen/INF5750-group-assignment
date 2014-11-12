define([
  "app"
], function(app) {
  "use strict";

  app.controller("IndexCtrl", [
    "$scope",
    function ($scope) {

      $scope.title = "Hello world";
    }
  ]);
});
