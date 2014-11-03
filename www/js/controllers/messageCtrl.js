define([
  "app"
], function(app) {
  app.controller("MessageCtrl", [
    "$scope", "$http", "$resource",
    function($scope, $http, $resource) {
      "use strict";

      $http.get('mocks/messages.json')
        .success(function (data, status, headers, config) {
          $scope.messages = data;
        })

        .error(function(){
          console.log("Error! ")
        })


      $scope.msg = "Messages:"; /* TODO Remove */

    }
  ])
});
