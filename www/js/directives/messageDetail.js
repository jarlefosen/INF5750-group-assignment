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
        messageid: "=messageid",
        setFollowUp: "@",
        replyFn: "&"
      },
      link: function(scope, elem, attrs){
        console.log("Message Detail Directive loads");
        scope.content = "";
        /* Evaluate scope reply function */
        var reply = scope.replyFn();

        scope.replyFunction = function() {
          reply(scope.messageid, scope.content)
        };

        scope.setFollowUp = function(message){
          scope.$parent.setFollowUp(message);
        }

      }
    };
  });
});
