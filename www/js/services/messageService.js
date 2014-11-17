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
            console.log("YEY!" + data);
          })
          .error(function () {

          });
        return deferred.promise;
        //Messages.delete({messageId: messageId});
      }

      function newMessage(subject, text, user_receivers, group_receivers, org_receivers) {
        var deferred = $q.defer();

        var user_list = [];
        angular.forEach(user_receivers, function (entry) {
          var l = {id: entry};
          user_list.push(l);
        });

        var group_list = [];
        angular.forEach(group_receivers, function (entry) {
          var l = {id: entry};
          group_list.push(l);
        });

        var org_list = [];
        angular.forEach(org_receivers, function (entry) {
          var l = {id: entry};
          org_receivers.push(l);
        });

        console.log("user_list = " + user_list);
        console.log("group_list = " + group_list);
        console.log("unit_list = " + org_list);

        var message = {
          subject: subject,
          text: text,
          users: user_list,
          userGroups: group_list,
          organisationUnits: org_list
        };

        $http.post(ServerConfig.host + MESSAGES_BASE_URL, message)
          .success(function (data) {
            console.log("POST message");
          })
          .error(function () {
            console.log("Error POSTing:(");
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
