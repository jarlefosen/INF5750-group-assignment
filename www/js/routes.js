define([
  "app",
  "controllers/indexCtrl",
  "controllers/navbarCtrl",
  "controllers/loginCtrl",
  "controllers/InboxCtrl",
  "controllers/messageDetailCtrl"
], function (app) {
  "use strict";

  app.config([
    "$routeProvider", "$httpProvider",
    function ($routeProvider, $httpProvider) {
      $routeProvider
        .when("/login", {
          templateUrl: "partials/login.html",
          controller: "LoginCtrl"
        })

        .when("/messages", {
          templateUrl: "partials/messages.html",
          controller: "InboxCtrl"
        })

        .when("/messages/:messageId", {
          templateUrl: "partials/messageDetail.html",
          controller: "MessageDetailCtrl"
        })

        .otherwise({
          redirectTo: "/messages"
        });

      var loginInterceptor = [
        "$q", "$location",
        function ($q, $location) {

          function success(response) {
            if (response.headers("Login-Page")) {
              $location.url("/login");
              location.reload();
              return $q.reject(response);
            }

            return response;
          }

          function error(response) {
            return response;
          }

          return function (promise) {
            return promise.then(success, error);
          };
        }];

      $httpProvider.responseInterceptors.push(loginInterceptor);

    }
  ]);
});
