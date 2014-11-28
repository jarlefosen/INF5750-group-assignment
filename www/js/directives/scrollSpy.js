define([
  "app"
], function (app) {
  "use strict";
  app.directive("scrollSpy", function () {
    return {
      restrict: "A",
      replace: false,
      link: function(scope, element, attrs){
        var el = element[0];
        element.bind("scroll", function(e){
          if(el.scrollTop > 10){
            element.addClass("fix-buttons");
          }else{
            element.removeClass("fix-buttons");
          }
        });
      }
    };
  });
});
