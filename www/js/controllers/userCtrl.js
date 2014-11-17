define([
  "app",
  "services/userService"
], function(app) {
  "use strict";

  app.controller("UserCtrl", [
    "$scope", "UserService",
    function($scope, UserService) {

      $scope.users = [];
      $scope.query = "";

      $scope.search = function() {
        UserService.search($scope.query).then(
          function(data) {
            $scope.users = data;
          }
        );
      };

      $scope.byId = function() {
        UserService.getUser($scope.query).then(
          function(data) {
            var list = [];
            if (data !== undefined) {
              list.push(data);
            }
            $scope.users = list;
          }
        );
      };


      UserService.getUsers().then(
        function(data) {
          $scope.users = data;
        }
      );
    }
  ]);
});
