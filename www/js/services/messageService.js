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
      var MY_INBOX_URL = "/api/me/inbox";

      function getAllMessages() {
        var deferred = $q.defer();

        $http.get(ServerConfig.host + MY_INBOX_URL)
          .success(function(data){
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
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(){
            deferred.reject();
          });
        return deferred.promise;
      }

      function deleteMessage(messageId) {
        var deferred = $q.defer();

        $http.delete(ServerConfig.host + MESSAGES_BASE_URL + "/" + messageId)
          .success(function(data){
            deferred.resolve(data);
          })
          .error(function(){
            deferred.reject();
          });
        return deferred.promise;
      }

      return {
        getAllMessages: getAllMessages,
        getMessage: getMessage,
        deleteMessage: deleteMessage
      };
    }
  ]);
});
