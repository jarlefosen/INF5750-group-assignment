define([
  "app"
], function(app) {
  "use strict";

  app.directive("navbarTop", function(){
    return {
      restrict: "E",
      replace: true,
      templateUrl: "partials/navbarTop.html",
      scope: {
        settings: "=settings"
      },
      link: function(scope, elem, attrs){
        scope.setClass = function(){
          if(scope.settings.showEdit == false){
            return "hidden";
          }
        }
      }
    };
  });
});
