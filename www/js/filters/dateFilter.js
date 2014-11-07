define([
  "app"
], function(app){
  app.filter("dateFilter", ["$filter", function($filter){
    "use strict";
    return function(isoDate){
      return $filter("date")(isoDate, "dd.MM.yy");
    };
  }]);
});
