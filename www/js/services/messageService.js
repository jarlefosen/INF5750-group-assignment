/* eslint no-console: 0 */

define([
  "app",
  "angular",
  "factories/serverConfig"
], function (app, angular) {
  "use strict";

  app.service("MessageService", [
    "ServerConfig", "$q", "$http",

    function (ServerConfig, $q, $http) {

      /* Stores a sorted list with all the conversation IDs */
      var INBOX_LIST_CACHE_KEY = "no.uio.inf5750-11.inbox-list";
      /* Stores an object with all conversations (unsorted) */
      var MESSAGE_CACHE_KEY = "no.uio.inf5750-11.messages";

      var MESSAGES_BASE_URL = "/api/messageConversations";
      var MY_INBOX_URL = "/api/me/inbox";

      var cacheDays = 30;
      var cacheTTL = cacheDays * 24 * 60 * 60 * 1000; // milliseconds

      var DEFAULT_MESSAGE_FIELDS = "lastUpdated,id,name,subject,lastMessage,lastSender,messages[id,name,sender,created],userMessages[user[id,name]]";

      function clearCache() {
        try {
          localStorage.removeItem(INBOX_LIST_CACHE_KEY);
          localStorage.removeItem(MESSAGE_CACHE_KEY);
        } catch(e) {
          console.log("Failed to clear cache in Message Service");
        }
      }

      function shouldStoreElement(entry) {
        if (entry === undefined || entry.lastUpdated === undefined) {
          return false;
        }

        var entryDate = new Date(entry.lastUpdated).getTime();
        var nowDate = new Date().getTime();

        return nowDate - cacheTTL < entryDate;
      }

      function getConversationObjectFromCache() {
        return angular.fromJson(localStorage.getItem(MESSAGE_CACHE_KEY)) || {};
      }

      function getConversationFromCache(id) {
        var conversationsObject = getConversationObjectFromCache();
        return conversationsObject[id];
      }

      function saveConversation(conversation) {
        if (!shouldStoreElement(conversation)) {
          return;
        }

        var obj = getConversationObjectFromCache();
        obj[conversation.id] = conversation;

        try {
          localStorage.setItem(MESSAGE_CACHE_KEY, angular.toJson(obj));
        } catch (e) {
          console.log("Could not store message conversation to localStorage. Probably full.");
          console.log(e);
        }

      }

      function deleteConversationFromCache(id) {
        var obj = getConversationObjectFromCache();
        delete obj[id];
        try {
          localStorage.setItem(MESSAGE_CACHE_KEY, angular.toJson(obj));
        } catch(e) {
          console.log("Could not perform localStorage operation. Memory might be full.");
          console.log(e);
        }
      }

      function getInboxListFromCache() {
        return angular.fromJson(localStorage.getItem(INBOX_LIST_CACHE_KEY)) || [];
      }

      function getInboxEntryFromCache(id) {
        var list = getInboxListFromCache();
        for (var i = 0; i < list.length; i++) {
          if (list[i].id === id) {
            return list[i];
          }
        }

        return {};
      }

      /* Will remove any threads 30 days or older since last activity */
      function cleanInboxCache() {
        var obj = getConversationObjectFromCache();
        var list = getInboxListFromCache();
        var cleaned = {};

        /* Iterates through the list to find elements that should be stored */
        list.forEach(function(element) {
          if (shouldStoreElement(element)) {
            cleaned[element.id] = obj[element.id];
          }
        });

        /* Overwrite storage with cleaned cache */
        try {
          localStorage.setItem(MESSAGE_CACHE_KEY, angular.toJson(cleaned));
        } catch (e) {
          console.log("Could not store messages to localStorage. Probably full");
          console.log(e);
        }

      }

      function saveInboxList(list) {
        if (list === undefined || !Array.isArray(list)) {
          list = [];
        }

        cleanInboxCache();

        try {
          localStorage.setItem(INBOX_LIST_CACHE_KEY, angular.toJson(list));
        } catch (e) {
          console.log("Could not store inbox-list to localStorage. Probably full.");
          console.log(e);
        }

      }

      function convertConverstion(conversation) {
        var conv = getInboxEntryFromCache(conversation.id);
        conv.messages = conversation.messages;
        conv.lastSender = conversation.lastSender;
        conv.lastUpdated = conversation.lastUpdated;
        conv.userMessages = conversation.userMessages;
        return conv;
      }

      function getConversation(id, lastUpdated) {
        var deferred = $q.defer();
        var cached = getConversationFromCache(id) || {};

        if (lastUpdated !== undefined && lastUpdated === cached.lastUpdated) {
          deferred.resolve(cached);
          return deferred.promise;
        }
        var config = {
          params: {
            fields: DEFAULT_MESSAGE_FIELDS
          }
        };

        $http.get(ServerConfig.host + MESSAGES_BASE_URL + "/" + id + ".json", config)
          .success(function(data, status, headers) {
            if (headers["Login-Page"]) {
              deferred.resolve(cached);
            } else {
              var converted = convertConverstion(data);
              saveConversation(converted);
              deferred.resolve(converted);
            }
          })
          .error(function() {
            deferred.resolve(cached);
          });

        return deferred.promise;
      }


      /* messageUpdateCallback will be called when there are updated messages */
      function getInbox() {
        var deferred = $q.defer();

        $http.get(ServerConfig.host + MY_INBOX_URL)
          .success(function(data) {
            saveInboxList(data.messageConversations);
            var messageConversations = data.messageConversations || [];

            var result = [];
            for (var i = 0; i < messageConversations.length; i++) {
              var cached = getConversationFromCache(messageConversations[i].id);
              if (cached) {
                result.push(cached);
              } else {
                result.push(messageConversations[i]);
              }
            }
            deferred.resolve(result);
          })
          .error(function() {
            deferred.resolve(getInboxCache());
          });

        return deferred.promise;
      }


      function deleteConversation(messageId) {
        var deferred = $q.defer();

        $http.delete(ServerConfig.host + MESSAGES_BASE_URL + "/" + messageId)
          .success(function(data){
            deleteConversationFromCache(messageId);
            deferred.resolve(data);
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
          orgList.push(l);
        });

        var message = {
          subject: subject,
          text: text,
          users: userList || [],
          userGroups: groupList || [],
          organisationUnits: orgList || []
        };

        $http.post(ServerConfig.host + MESSAGES_BASE_URL + ".json", message)
          .success(function () {
            deferred.resolve();
          })
          .error(function () {
            deferred.reject();
            console.log("Could not send message!");
            console.log(message);
          });
        return deferred.promise;
      }

      function reply(id, body) {
        var deferred = $q.defer();


        if (!body) {
          deferred.reject({message: "Body must be a string."});
          return deferred.promise;
        }

        var options = {
          headers: {
            "Content-Type": "text/plain"
          }
        };

        $http.post(MESSAGES_BASE_URL + "/" + id + ".json", body, options)
          .success(function() {
            deferred.resolve();
          })
          .error(function() {
            deferred.reject();
          });

        return deferred.promise;
      }

      return {
        getAllMessages: getInbox,
        getMessage: getConversation,
        getMessageFromCache: getConversationFromCache,
        deleteMessage: deleteConversation,
        clearCache: clearCache(),
        newMessage: newMessage,
        reply: reply
      };
    }
  ]);
});
