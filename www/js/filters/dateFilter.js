define([
  "app"
], function(app){
  "use strict";
  app.filter("dateFilter", ["$filter", function($filter){
    return function(isoDate){
      return $filter("date")(isoDate, "yyyy-MM-dd");
    };
  }]);
});
