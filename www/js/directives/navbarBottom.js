define([
  "app"
], function(app) {
  "use strict";

  app.directive("navbarBottom", function() {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "partials/navbarBottom.html"
    };
  });
});
