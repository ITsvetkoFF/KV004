define(['./module'],function(services){
    'use strict';
    services.factory('todayTime', function() {
    	return {
			formDataDt: new Date("2014-02-18 00:00:00"),
			formDataDtSecond: new Date()
    	}
  });
});