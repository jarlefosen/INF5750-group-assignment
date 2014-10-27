define([
  "app"
], function(app) {
  app.controller("NavbarController", [
    "$scope",
    function($scope) {
      "use strict";

      $scope.message = "This is a navbar"
    }
  ])
});
