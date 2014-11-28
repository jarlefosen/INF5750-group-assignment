define([
  "app"
], function(app){
  "use strict";
  app.directive("messageDetail",
    ["MessageService", "$state",
      function(MessageService, $state){
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
          link: function(scope){
            scope.content = "";
            /* Evaluate scope reply function */
            var reply = scope.replyFn();

            scope.replyFunction = function() {
A              reply(scope.messageid, scope.content);
            };

            scope.setUnread = function(message) {
              MessageService.setUnread(message.id);
            };

            scope.setFollowUp = function(message){
              MessageService.setFollowUp(message.id);
            };

            scope.delMessage = function(message){
              MessageService.deleteMessage(message.id);
              $state.go("messages");
            };

          }
        };
      }
    ]
  );
});
