define([
  "app"
], function (app) {
  "use strict";
  app.controller("NavbarCtrl", [
    "$scope",
    function ($scope) {

      $scope.message = "This is a navbar";
    }
  ]);
});
