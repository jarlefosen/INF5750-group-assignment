/**
 * Created by jarle on 03.11.14.
 */
define([
  "app"
], function(app) {
  "use strict";

  app.factory("ServerConfig", [
    function() {

      return {
        host: "http://inf5750-11.uio.no"
      };

    }
  ]);

});