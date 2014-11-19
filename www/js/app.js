define(
  ["angular", "angular-route", "angular-resource", "angular-animate", "angular-ui-router"],
  function (angular) {
    "use strict";

    return angular.module("app", ["ngRoute", "ngResource", "ngAnimate", "ui.router"]);
  }
);
