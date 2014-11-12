/**
 * Created by jarle on 03.11.14.
 */
define([
  "app"

], function (app) {
  "use strict";

  app.factory("ServerConfig", [
    function () {

      //var base = "apps.dhis2.org/demo";
      var base = "inf5750-11.uio.no";

      return {
        host: "http://" + base
      };

    }
  ]);

});
