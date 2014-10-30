define(['./module'],function(services){
    'use strict';
    services.factory('windowWidth', function(){
    	return {
    		getWindowDimensions: function() {
    			return window.innerWidth;
    		}
    	};
    });
});