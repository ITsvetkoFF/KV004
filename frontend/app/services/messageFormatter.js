define(['./module'],function(services){
      'use strict';
      services.value('messageFormatter', function(date, nick, message) {
      return date.toLocaleTimeString() + ' - ' + 
           nick + ' - ' + 
           message + '\n';
    
  });
	
});