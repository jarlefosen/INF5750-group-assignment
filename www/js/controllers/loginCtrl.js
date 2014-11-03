define([
  "app",
  "services/loginService"
], function(app) {
  app.controller("LoginCtrl", [
    "$scope", "LoginService", "$location",
    function($scope, LoginService, $location) {
      "use strict";

      $scope.username = "";
      $scope.password = "";

      $scope.login = function() {

        /* Login is just a stub for now */
        LoginService.login($scope.username, $scope.password)
          .then(
          function (data) {
            $location.url("/");
          },
          function(error) {
            window.location.reload();
          });
      };

    }
  ])
});
