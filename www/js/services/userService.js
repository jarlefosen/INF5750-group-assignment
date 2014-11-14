define([
  "app",
  "angular",
  "angular-resource",
  "factories/serverConfig"
], function(app, angular) {
  "use strict";

  app.service("UserService", [
    "$q", "ServerConfig", "$http",
    function($q, ServerConfig, $http) {
      var USER_URL = "/api/users.json";
      var CACHE_KEY = "no.uio.inf5750-11.users";
      var CACHE_TIMESTAMP_KEY = "no.uio.inf5750-11.users.timestamp";

      /* Time To Live for cache in seconds */
      var CACHE_TTL = 60; // seconds

      var isFetchingUsers = false;

      /* Clears cached data */
      function clearCache() {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      }

      /* Returns an object of users/units. If undefined - returns an empty object */
      function getObjectFromCache() {
        return angular.fromJson(localStorage.getItem(CACHE_KEY)) || {};
      }

      function getListFromCache() {
        var userMap = getObjectFromCache();

        /* Copy content from model to list */
        var userList = $.map(userMap, function(element) {
          return element;
        });

        return userList;
      }

      function saveToCache(list) {
        /* If the list is null or undefined, return */
        if (list === undefined || !Array.isArray(list)) {
          return;
        }

        /* Get users as hashmap */
        var users = getObjectFromCache();

        /* Identifier that tells if we update cache content */
        var isUpdated = false;

        /* Update hashmap with entries from list */
        list.forEach(function (element) {
          /* If the element is undefined, update cache identifier */
          if (users[element.id] === undefined) {
            isUpdated = true;
          }

          users[element.id] = element;
        });

        /* If cache model is updated, save to cache */
        if (isUpdated) {
          localStorage.setItem(CACHE_KEY, angular.toJson(users));
          localStorage.setItem(CACHE_TIMESTAMP_KEY, angular.toJson(new Date()));
        }
      }

      function fetchUserList() {
        var deferred = $q.defer();

        if (isFetchingUsers) {
          deferred.reject();
        } else {
          isFetchingUsers = true;

          $http({
            method: "GET",
            url: ServerConfig.host + USER_URL
          }).success(function(data, status, headers) {
            isFetchingUsers = false;
            /* If server response is OK (not login-page), pipe result to cache */
            if (!headers["Login-Page"]) {
              saveToCache(data.users);
            }
            deferred.resolve(getListFromCache());
          }).error(function() {
            isFetchingUsers = false;
            deferred.resolve(getListFromCache());
          });

        }

        return deferred.promise;
      }

      function isCacheValid() {
        var cache_time = angular.fromJson(localStorage.getItem(CACHE_TIMESTAMP_KEY));
        var ttl = CACHE_TTL * 1000; // from seconds to milliseconds

        if (!cache_time) {
          return false;
        }

        return cache_time + ttl > new Date().getTime();
      }

      function getUserById(id) {
        if (!isCacheValid()) {
          fetchUserList();
        }

        return getObjectFromCache()[id];
      }

      function searchUser(query) {
        if (!isCacheValid()) {
          fetchUserList();
        }

        query = query.toLowerCase();
        var userList = getListFromCache();
        var resultList = userList.filter(function(element) {
          return element.name.toLowerCase().indexOf(query) !== -1;
        });

        return resultList;
      }

      function getUsers() {
        var deferred = $q.defer();

        if (!isCacheValid()) {
          fetchUserList().then(
            function() {
              deferred.resolve(getListFromCache());
            },
            function() {
              deferred.resolve(getListFromCache());
            }
          );
        } else {
          deferred.resolve(getListFromCache());
        }

        return deferred.promise;
      }

      return {
        clearCache: clearCache,
        getUsers: getUsers,
        getUser: getUserById,
        search: searchUser
      };
    }
  ]);
});