define([
    "angular",
    "angular-route",
    "angular-resource",
    "angular-animate",
    "angular-ui-router",
    "scrollglue"
  ],function (angular) {
    "use strict";
    return angular.module("app", [
      "ngRoute",
      "ngResource",
      "ngAnimate",
      "ui.router",
      "luegg.directives"
    ]);
  }
);
