define([
  "app"
], function(app) {
  "use strict";

  app.directive("navbarTop", function(){
    return {
      restrict: "E",
      replace: true,
      templateUrl: "partials/navbarTop.html"
    };
  });
});
