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
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function () {
            deferred.reject();
          });

        return deferred.promise;
      }

      function getMessage(messageId) {
        var deferred = $q.defer();

        $http.get(ServerConfig.host + MESSAGES_BASE_URL + "/" + messageId)
          .success(function (data) {
            deferred.resolve(data);
          })
          .error(function () {
            deferred.reject();
          });
        return deferred.promise;
      }

      function deleteMessage(messageId) {
        var deferred = $q.defer();

        $http.delete(ServerConfig.host + MESSAGES_BASE_URL + "/" + messageId)
          .success(function (data) {

          })
          .error(function () {

          });
        return deferred.promise;
      }

      function newMessage(subject, text, userReceivers, groupReceivers, orgReceivers) {
        var deferred = $q.defer();

        var userList = [];
        angular.forEach(userReceivers, function (entry) {
          var l = {id: entry};
          userList.push(l);
        });

        var groupList = [];
        angular.forEach(groupReceivers, function (entry) {
          var l = {id: entry};
          groupList.push(l);
        });

        var orgList = [];
        angular.forEach(orgReceivers, function (entry) {
          var l = {id: entry};
          orgReceivers.push(l);
        });

        var message = {
          subject: subject,
          text: text,
          users: userList,
          userGroups: groupList,
          organisationUnits: orgList
        };

        $http.post(ServerConfig.host + MESSAGES_BASE_URL, message)
          .success(function (data) {

          })
          .error(function () {

          });
        return deferred.promise;
      }

      return {
        getAllMessages: getAllMessages,
        getMessage: getMessage,
        deleteMessage: deleteMessage,
        newMessage: newMessage
      };
    }
  ]);
});
