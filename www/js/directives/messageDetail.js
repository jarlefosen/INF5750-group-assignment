define([
  "app"
], function(app){
  "use strict";
  app.directive("messageDetail", function(){
    return {
      restrict: "E",
      replace: true,
      templateUrl: "partials/singleMessage.html",
      scope: {
        message: '=message'
      }
    };
  });
});
