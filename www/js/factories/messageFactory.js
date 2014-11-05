/**
 * Created by cbbx on 05/11/14.
 */
define([
  "app",
  "angular-resource",
  "factories/serverConfig"
], function (app) {
  "use strict";

  app.factory("Messages", [
    "ServerConfig", "$resource",
    function (ServerConfig, $resource) {
      return $resource(ServerConfig.host + "/api/messageConversations.json");
    }
  ]);

});