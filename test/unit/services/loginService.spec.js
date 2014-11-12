define([
  "angular",
  "angular-mocks",
  "app",
  "services/loginService"
], function(angular) {
  "use strict";

  var inject = angular.mock.inject;

  describe("LoginService", function() {

    beforeEach(angular.mock.module("app"));

    it("should be defined", inject(function(LoginService) {
      expect(LoginService).toBeDefined();
    }));

    describe("login", function() {
      it("should be defined", inject(function(LoginService) {
        expect(LoginService.login).toBeDefined();
      }));

    });

    describe("logout", function() {
      it("should be defined", inject(function(LoginService) {
        expect(LoginService.logout).toBeDefined();
      }));

    });

    describe("getProfile", function() {
      it("should be defined", inject(function(LoginService) {
        expect(LoginService.getProfile).toBeDefined();
      }));

    });


  });

});
