define([
  "app",
  "services/userService"
], function(app) {

  app.controller("UserCtrl", [
    "$scope", "UserService",
    function($scope, UserService) {

      $scope.users = [];
      $scope.query = "";

      $scope.search = function() {
        $scope.users = UserService.search($scope.query);
      };

      $scope.byId = function() {
        var list = [];
        var user = UserService.getUser($scope.query);
        if (user !== undefined) {
          list.push(user);
        }

        $scope.users = list;
      };


      UserService.getUsers().then(
        function(data) {
          $scope.users = data;
        }
      );
    }
  ]);
});
