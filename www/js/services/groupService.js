/**
 * Created by cbbx on 19/11/14.
 */
define([
  "../app",
  "angular",
  "angular-resource",
  "factories/serverConfig"
], function (app, angular) {
  "use strict";

  app.service("GroupService", [
    "$q", "ServerConfig", "$http",
    function ($q, ServerConfig, $http) {
      var GROUP_URL = "/api/userGroups.json?paging=false";
      var CACHE_KEY = "no.uio.inf5750-11.userGroups";
      var CACHE_TIMESTAMP_KEY = "no.uio.inf5750-11.userGroups.timestamp";

      var CACHE_TTL = 60;

      var isFetchingUserGroups = false;

      function clearCache() {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      }

      function getObjectFromCache() {
        return angular.fromJson(localStorage.getItem(CACHE_KEY)) || {};
      }

      function getListFromCache() {
        var userGroupMap = getObjectFromCache();

        /* Copy content from model to list */
        var userGroupList = $.map(userGroupMap, function (element) {
          return element;
        });

        return userGroupList;
      }

      function saveToCache(list) {
        if (list === undefined || !Array.isArray(list)) {
          return;
        }

        var userGroups = getObjectFromCache();

        var isUpdated = false;

        list.forEach(function (element) {
          if (userGroups[element.id] === undefined) {
            isUpdated = true;
          }

          userGroups[element.id] = element;
        });

        if (isUpdated) {
          try {
            localStorage.setItem(CACHE_KEY, angular.toJson(userGroups));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, angular.toJson(new Date()));
          } catch (e) {
            console.log("Could not store userGroups in localStorage. Probably full.");
            console.log(e);
          }
        }
      }

      function fetchUserGroupList() {
        var deferred = $q.defer();

        if (isFetchingUserGroups) {
          deferred.resolve(getListFromCache());
        } else {
          isFetchingUserGroups = true;

          $http({
            method: "GET",
            url: ServerConfig.host + GROUP_URL
          }).success(function (data, status, headers) {
            /* If server response is OK (not login-page), pipe result to cache */
            if (!headers["Login-Page"]) {
              saveToCache(data.userGroups);
            }
            deferred.resolve(getListFromCache());
          }).error(function () {
            isFetchingUserGroups = false;
            deferred.resolve(getListFromCache());
          });

        }

        return deferred.promise;
      }

      function isCacheValid() {
        var cacheTime = angular.fromJson(localStorage.getItem(CACHE_TIMESTAMP_KEY));
        var ttl = CACHE_TTL * 1000; //From seconds to milliseconds

        if (!cacheTime) {
          return false;
        }

        return cacheTime + ttl > new Date().getTime();
      }

      function getUserGroups() {
        var deferred = $q.defer();

        if (!isCacheValid()) {
          fetchUserGroupList().then(
            function () {
              deferred.resolve(getListFromCache());
            },
            function () {
              deferred.resolve(getListFromCache());
            }
          );
        } else {
          deferred.resolve(getListFromCache());
        }

        return deferred.promise;
      }

      function getUserGroupByid(id) {
        var deferred = $q.defer();

        getUserGroups().then(
          function () {
            deferred.resolve(getObjectFromCache()[id]);
          },
          function () {
            deferred.resolve(getObjectFromCache()[id]);
          }
        );

        return deferred.promise;
      }

      function searchUserGroup(query) {
        var deferred = $q.defer();
        query = query.toLowerCase();

        getUserGroups().then(
          function (userGroupList) {
            var resultList = userGroupList.filter(function (element) {
              return element.name.toLowerCase().indexOf(query) !== -1;
            });
            deferred.resolve(resultList);
          }
        );

        return deferred.promise;
      }

      return {
        clearCache: clearCache,
        getUserGroups: getUserGroups,
        getUserGroup: getUserGroupByid,
        search: searchUserGroup
      };
    }
  ]);
});
