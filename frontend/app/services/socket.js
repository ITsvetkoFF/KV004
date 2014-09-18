define(['./module'],function(services){
      'use strict';
      services.factory('chatSocket', function (socketFactory) {
      var socket = socketFactory();
      socket.forward('broadcast');
      return socket;
  });
	
});