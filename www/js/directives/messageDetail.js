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
        message: "=message",
        setFollowUp: "@"
      },
      link: function(scope, elem, attrs){
        scope.setFollowUp = function(message){
          scope.$parent.setFollowUp(message);
        };

        scope.delMessage = function(message){
          scope.$parent.delMessage(message);
        };

      }
    };
  });
});
