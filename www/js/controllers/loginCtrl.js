/* eslint no-alert: 0 */

define([
  "app",
  "services/loginService"
], function (app) {
  "use strict";

  app.controller("LoginCtrl", [
    "$scope", "LoginService", "$location", "$route", "$state",
    function ($scope, LoginService, $location, $route, $state) {

      $scope.username = "";
      $scope.password = "";

      $scope.currentUser = "";

      $scope.goToMessages = function() {
        $state.go("messages");
      };

      $scope.logout = function () {
        LoginService.logout();
        $state.reload();
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
          function () {
            /* Login success - redirect to main page */
            $state.go("messages");
          },
          function () {
            /* Login failed - Alert notification */
            window.alert("Oups! Could not authenticate. Try again!");
          });
      };
    }
  ]);
});
