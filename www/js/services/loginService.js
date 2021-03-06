define([
  "app",
  "angular",
  "angular-resource",
  "factories/serverConfig"
], function (app) {
  "use strict";

  app.service("LoginService", [
    "ServerConfig", "$q", "$http",
    function (ServerConfig, $q, $http) {

      var LOGIN_URL = "/dhis-web-commons-security/login.action?authOnly=true";
      var LOGOUT_URL = "/dhis-web-commons-security/logout.action";
      var PROFILE_URL = "/api/me.json";

      function getProfile() {
        var deferred = $q.defer();

        $http.get(ServerConfig.host + PROFILE_URL)
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function () {
            deferred.reject();
          });

        return deferred.promise;
      }

      function logout() {
        var deferred = $q.defer();
        $http.get(ServerConfig.host + LOGOUT_URL)
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function () {
            deferred.resolve();
          });

        return deferred.promise;
      }

      function login(username, password) {
        var deferred = $q.defer();
        var content = {
          "j_username": username,
          "j_password": password
        };

        $http({
          method: "POST",
          url: ServerConfig.host + LOGIN_URL,
          data: $.param(content),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .success(function (data, status, headers) {
            /* If success we get application/json. If it fails we will get text/plain */
            if (headers("Login-Page")) {
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
        login: login,
        logout: logout,
        getProfile: getProfile
      };
    }
  ]);
});
