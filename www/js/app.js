define(
  ["angular", "angular-route", "angular-resource", "angular-ui-router"],
  function (angular) {
    "use strict";

    return angular.module("app", ["ngRoute", "ngResource", "ui.router"]);
  }
);
