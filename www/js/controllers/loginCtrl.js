define([
  "app",
  "services/loginService"
], function (app) {
  app.controller("LoginCtrl", [
    "$scope", "LoginService", "$location", "$route",
    function ($scope, LoginService, $location, $route) {
      "use strict";

      $scope.username = "";
      $scope.password = "";

      $scope.currentUser = "";

      $scope.logout = function () {
        LoginService.logout();
        $route.reload();
      };

      LoginService.getProfile().then(
        function (profile) {
          $scope.currentUser = profile.userCredentials.code;
        },
        function () {
          $scope.currentUser = "";
        }
      );


      $scope.login = function () {

        /* Login is just a stub for now */
        LoginService.login($scope.username, $scope.password)
          .then(
          function (data) {
            $location.url("/");
          },
          function (error) {
            window.alert("Oups! Could not authenticate. Try again!");
            /* Not logged in */
            //window.location.reload();
          });
      };

    }
  ]);
});
