define([
  "app"
], function(app) {

  app.filter("dateFilter", ['$filter', function($filter){
    return function(ISO_date){
      return $filter('date')(ISO_date, 'dd.MM.yy');
    }

  }]);

});