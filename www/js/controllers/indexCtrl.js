define([
  "app",
  "filters/dateFilter",
  "directives/inboxMessage"
], function(app) {
  app.controller("IndexCtrl", [
    "$scope",
    function($scope) {
      "use strict";

      $scope.title = "Hello world";

      $scope.messages =
        [
          {
            sender: "Tom Ebola",
            subject: "New outbreaks of Malaria",
            content: "The outbreak is registered in Sierra Leone and is going viral! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: true,
            followUp: true
          },
          {
            sender: "Amund M.",
            subject: "Diare på IFI",
            content: "Utbruddet startet etter besk smak på kotelettene fra SIO kantina! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: true,
            followUp: false
          },
          {
            sender: "Kåre Conradi",
            subject: "Takk for hjelpen!",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: false,
            followUp: false
          },
          {
            sender: "Maria Magdalena Jucovich Menarita",
            subject: "Business proposal with long subject line! Too long in fact",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: false,
            followUp: true
          },
          {
            sender: "Jens Stoltenberg",
            subject: "Diare på IFI",
            content: "Utbruddet startet etter besk smak på kotelettene fra SIO kantina! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: true,
            followUp: false
          },
          {
            sender: "Jens Stoltenberg",
            subject: "Diare på IFI",
            content: "Utbruddet startet etter besk smak på kotelettene fra SIO kantina! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: true,
            followUp: false
          },
          {
            sender: "Jens Stoltenberg",
            subject: "Diare på IFI",
            content: "Utbruddet startet etter besk smak på kotelettene fra SIO kantina! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: true,
            followUp: false
          },
          {
            sender: "Jens Stoltenberg",
            subject: "Diare på IFI",
            content: "Utbruddet startet etter besk smak på kotelettene fra SIO kantina! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: true,
            followUp: false
          },
          {
            sender: "Jens Stoltenberg",
            subject: "Diare på IFI",
            content: "Utbruddet startet etter besk smak på kotelettene fra SIO kantina! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: true,
            followUp: false
          },
          {
            sender: "Jens Stoltenberg",
            subject: "Diare på IFI",
            content: "Utbruddet startet etter besk smak på kotelettene fra SIO kantina! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea eligendi incidunt maiores nesciunt obcaecati, quae. Eaque inventore recusandae sit sunt.",
            date: "2014-08-19T07:49:38.621+0000",
            unread: true,
            followUp: false
          }
        ]
    }
  ])
});
