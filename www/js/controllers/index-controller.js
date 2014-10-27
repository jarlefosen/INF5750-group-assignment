define([
  "app"
], function(app) {
  app.controller("IndexController", [
    "$scope",
    function($scope) {
      "use strict";

      $scope.title = "Hello world";
    }
  ])
});
