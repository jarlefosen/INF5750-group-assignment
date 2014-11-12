define([
  "app"
], function(app) {
  app.directive("navbarBottom", function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/navbarBottom.html'
    }
  })
})