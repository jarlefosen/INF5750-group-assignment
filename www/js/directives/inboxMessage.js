define([
  "app"
], function(app) {
  app.directive("inboxMessage", function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/inbox-message.html'
    }
  });

});