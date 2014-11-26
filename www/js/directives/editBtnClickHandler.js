define([
  "app"
], function (app) {
  "use strict";

  app.directive("editBtnClickHandler", function () {
    return {
      restrict: "A",
      replace: false,
      transclude: false,
      link: function(scope, element, attrs){
        element.bind("click", function(){
          angular.element(attrs.options).toggleClass("delOpen");
        });
      }
    };
  });
});
