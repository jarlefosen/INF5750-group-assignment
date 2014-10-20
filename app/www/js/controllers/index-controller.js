define([
  "app"
], function(app) {
  app.controller("IndexController", [
    "$scope", function($scope) {
      $scope.title = "Hello world";
    }
  ])
});
