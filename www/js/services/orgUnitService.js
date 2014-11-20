/**
 * Created by cbbx on 19/11/14.
 */
define([
  "app",
  "angular",
  "angular-resource",
  "factories/serverConfig"
], function (app, angular) {
  "use strict";

  app.service("OrgUnitService", [
    "$q", "ServerConfig", "$http",
    function ($q, ServerConfig, $http) {
      var ORGUNIT_URL = "/api/organisationUnitGroups.json";
      var CACHE_KEY = "no.uio.inf5750-11.orgUnit";
      var CACHE_TIMESTAMP_KEY = "no.uio.inf5750-11.orgUnit.timestamp";

      var CACHE_TTL = 60;

      var isFetchingOrgUnits = false;

      function clearCache() {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      }

      function getObjectFromCache() {
        return angular.fromJson(localStorage.getItem(CACHE_KEY)) || {};
      }

      function getListFromCache() {
        var orgUnitMap = getObjectFromCache();

        /* Copy content from model to list */
        var orgUnitList = $.map(orgUnitMap, function (element) {
          return element;
        });

        return orgUnitList;
      }

      function saveToCache(list) {
        if (list === undefined || !Array.isArray(list)) {
          return;
        }

        var orgUnits = getObjectFromCache();

        var isUpdated = false;

        list.forEach(function (element) {
          if (orgUnits[element.id] === undefined) {
            isUpdated = true;
          }

          orgUnits[element.id] = element;
        });

        if (isUpdated) {
          try {
            localStorage.setItem(CACHE_KEY, angular.toJson(orgUnits));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, angular.toJson(new Date()));
          } catch (e) {
            console.log("Could not store orgUnits in localStorage. Probably fyll.");
            console.log(e);
          }
        }
      }

      function fetchOrgUnitList() {
        var deferred = $q.defer();

        if (isFetchingOrgUnits) {
          deferred.resolve(getListFromCache());
        } else {
          isFetchingOrgUnits = true;

          $http({
            method: "GET",
            url: ServerConfig.host + ORGUNIT_URL
          }).success(function (data, status, headers) {
            /* If server response is OK (not login-page), pipe result to cache */
            if (!headers["Login-Page"]) {
              saveToCache(data.organisationUnitGroups);
            }
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

      function getOrgUnits() {
        var deferred = $q.defer();

        if (!isCacheValid()) {
          fetchOrgUnitList().then(
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

      function getOrgUnitById(id) {
        var deferred = $q.defer();

        getOrgUnits().then(
          function () {
            deferred.resolve(getObjectFromCache()[id]);
          },
          function () {
            deferred.resolve(getObjectFromCache()[id]);
          }
        );

        return deferred.promise;
      }

      function searchOrgUnit(query) {
        var deferred = $q.defer();
        query = query.toLowerCase();

        getOrgUnits().then(
          function (orgUnitList) {
            var resultList = orgUnitList.filter(function (element) {
              return element.name.toLowerCase().indexOf(query) !== -1;
            });
            deferred.resolve(resultList);
          }
        );

        return deferred.promise;
      }

      return {
        clearCache: clearCache,
        getOrgUnits: getOrgUnits,
        getOrgUnit: getOrgUnitById,
        search: searchOrgUnit
      };
    }
  ]);
});
