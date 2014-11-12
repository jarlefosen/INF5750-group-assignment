/**
 * Created by cbbx on 05/11/14.
 */

define([
  "app",
  "../factories/messageFactory"
], function (app) {
  "use strict";

  app.service("MessageService", [
    "Messages",
    function (Messages) {

      function getAllMessages() {
        return Messages.get();
      }

      function getMessage(id) {
        return Messages.get({messageId: id});
      }

      return {
        getAllMessages: getAllMessages,
        getMessage: getMessage
      };
    }
  ]);
});
