define([
  "app"
], function (app) {
  "use strict";

  app.directive("inboxMessage", function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "partials/inbox-message.html"
    };
  });
});
