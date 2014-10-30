define(['./module'],function(services){
    'use strict';
    services.factory('todayTime', function() {
    	return {
			formDataDt: new Date(2014,1,18),
			formDataDtSecond: new Date((new Date()).getTime()+24*60*60*1000)
    	}
  });
});
