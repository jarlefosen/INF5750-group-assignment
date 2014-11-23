/**
 * Created by cbbx on 19/11/14.
 */
define([
  "../app",
  "services/groupService"
], function(app) {
  "use strict";

  app.controller("UserGroupCtrl", [
    "$scope", "GroupService",
    function($scope, GroupService) {
      $scope.groups = [];
      $scope.query = "";

      $scope.search = function() {
        GroupService.search($scope.query).then(
          function(data) {
            $scope.groups = data;
          }
        );
      };

      $scope.byId = function() {
        GroupService.getUserGroup($scope.query).then(
          function(data) {
            var list = [];
            if (data !== undefined) {
              list.push(data);
            }
            $scope.groups = list;
          }
        );
      };

      GroupService.getUserGroups().then(
        function(data) {
          $scope.groups = data;
        }
      );
    }
  ]);
});
