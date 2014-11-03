define([
  "app"
], function(app) {
  app.controller("MessageCtrl", [
    "$scope", "$http",
    function($scope, $http) {
      "use strict";

      $http.get('mocks/messages.json')
        .success(function (data, status, headers, config) {
          $scope.messages = data;
        })

        .error(function(){
          console.log("Error! ")
        })


    }
  ])
});
