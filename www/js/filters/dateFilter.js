define([
  "app"
], function(app){
  "use strict";
  app.filter("dateFilter", ["$filter", function($filter){
    return function(isoDate){
      return $filter("date")(isoDate, "yyyy-MM-dd");
    };
  }]);
  app.filter("dateFilterDetail", ["$filter", function($filter){
    return function(isoDate){
      return $filter("date")(isoDate, "yyyy.MM.dd - HH:mm");
    };
  }]);
});
