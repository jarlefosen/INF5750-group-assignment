define([
  "angular",
  "angular-mocks",
  "app",
  "controllers/loginCtrl"
], function(angular) {
  "use strict";

  var inject = angular.mock.inject;

  /* Describe a section of tests. Let's say what Controller we're testing */
  describe("LoginCtrl", function() {

    var $scope;
    var LoginService;

    /* What should happen before each test? */
    beforeEach(angular.mock.module("app"));

    beforeEach(angular.mock.module(function($provide) {
      LoginService = {
        login: function(){
          return {then: function(){}};
        },
        logout: function () {},
        getProfile: function () {
          return {then: function(){}};
        }
      };

      /* Let's tell app that LoginService is actually the object above */
      $provide.value("LoginService", LoginService);

      /* And let's reset the $scope between each test */
      $scope = {};
    }));

    /* New description - Maybe what function you are testing? */
    describe("login", function() {

      /* The test -> It should do something. Inject is an alias from above */
      it("should define login action on scope", inject(function($controller) {
        /* We're telling LoginCtrl that it's scope is now our $scope. Then we check it's values */
        $controller("LoginCtrl", {
          "$scope": $scope
        });

        /* What do we expect from the Controller? What should be defined? */
        expect($scope.login).toBeDefined();
      }));

      it("should call LoginService login function", inject(function($controller) {
        $controller("LoginCtrl", {
          "$scope": $scope
        });

        spyOn(LoginService, "login").and.returnValue({then: function(){}});
        $scope.login();

        expect(LoginService.login).toHaveBeenCalled();
      }));

    });

    /* Describe yet another function */
    describe("logout", function() {

      /* What do we expect from it? */
      it("should define logout action on scope", inject(function($controller) {
        $controller("LoginCtrl", {
          "$scope": $scope
        });

        expect($scope.logout).toBeDefined();
      }));
    });

  });

});
