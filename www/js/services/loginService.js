define([
  "app",
  "angular",
  "angular-resource",
  "factories/serverConfig",
  "factories/base64"
], function(app, angular) {

  app.service("LoginService", [
    "ServerConfig", "$q", "base64", "$http",
    function(ServerConfig, $q, base64, $http) {

      var TOKEN_KEY = "no.uio.inf5750-11.auth";
      var LOGIN_URL = "/api/me";

      function login(username, password) {

        var deferred = $q.defer();
        var basic = base64.encode(username + ":" + password);
        var basicHeader = "Basic " + basic;

        var header = {
          "Authorization": basicHeader
        };

        $http.get(ServerConfig.host + LOGIN_URL, header)
          .success(function(data, status) {
            if (status !== 200) {
              deferred.reject(data);
            } else {
              deferred.resolve(data);
            }
          })
          .error(function (error) {
            deferred.reject(error);
          });

        return deferred.promise;
      }

      return {
        login: login
      }
    }
  ]);
});