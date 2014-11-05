define([
  "app"
], function(app) {
  app.controller("IndexCtrl", [
    "$scope",
    function($scope) {
      "use strict";

      $scope.title = "Hello world";

      $scope.message = {
        sender: "Tom Ebola",
        subject: "New outbreaks of Malaria",
        content: "The outbreak is registered in Sierra Leone and is going viral! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
        date: "2014-08-19T07:49:38.621+0000"
      }
    }
  ])
});
