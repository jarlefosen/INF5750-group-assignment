define([
  "app"
], function(app) {
  app.directive("navbarTop", function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/navbarTop.html'
    }
  });
});
