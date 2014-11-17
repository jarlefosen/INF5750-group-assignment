define([
  "app"
], function(app) {
  "use strict";

  app.directive("navbarBottom", function() {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "partials/navbarBottom.html",
      scope: {
        setfilter: "@"
      },
      link: function(scope, element, attrs){
        scope.setFilter = function(val){
          scope.$parent.setFilter(val);
        };
      }
    };
  });
});
