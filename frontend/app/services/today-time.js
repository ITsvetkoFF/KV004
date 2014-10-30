define(['./module'],function(services){
    'use strict';
    services.factory('todayTime', function() {
    	return {
			formDataDt: new Date(2014,2,18),
			formDataDtSecond: new Date((new Date()).getTime()+2*60*60*1000+60*1000)
    	}
  });
});
