define([
  "app",
  "angular",
  "factories/serverConfig"
], function (app) {
  "use strict";

  app.service("MessageService", [

    "ServerConfig", "$q", "$http",
    function (ServerConfig, $q, $http) {

      var MESSAGES_BASE_URL = "/api/messageConversations";

      function getAllMessages() {
        var deferred = $q.defer();

        $http.get(ServerConfig.host + MESSAGES_BASE_URL)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function(){
            deferred.reject();
          });

        return deferred.promise;
      }

      function getMessage(messageId) {
        var deferred = $q.defer();

        $http.get(ServerConfig.host + MESSAGES_BASE_URL + "/" + messageId)
          .success(function(data) {
            deferred.resolve(data);
          })
          .error(function() {
            deferred.reject();
          });
        return deferred.promise;
      }

      return {
        getAllMessages: getAllMessages,
        getMessage: getMessage
      };
    }
  ]);
});
