define(['./module'],function(controllers){
	'use strict';
	////////////
	 

 
	  controllers.controller('SocketCtrl', function ($log, $scope, chatSocket, messageFormatter) {
	  $scope.nickName = $scope.name;
	  $scope.messageLog = '';
	  $scope.sendMessage = function() {
	    var match = $scope.message.match('^\/nick (.*)');
/*
	    if (angular.isDefined(match) && angular.isArray(match) && match.length === 2) {
	      var oldNick = nickName;
	      nickName = match[1];
	      $scope.message = '';
	      $scope.messageLog = messageFormatter(new Date(), 
				 nickName, 'nickname changed - from ' + 
				   oldNick + ' to ' + nickName + '!') + $scope.messageLog;
	      $scope.nickName = nickName;
	    }
*/
	    $log.debug('sending message', $scope.message);
	    chatSocket.emit('message', $scope.nickName, $scope.message);
	    $scope.message = '';
	  };

	    $scope.$on('socket:broadcast', function(event, data) {
          console.log(data);
	    $log.debug('got a message', event.name);
	    if (!data.payload) {
	      $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
	      return;
	    } 
	    $scope.$apply(function() {
	      $scope.messageLog = messageFormatter(new Date(), data.source, data.payload) + $scope.messageLog;
    });
  });
});

	///////////
	
	
	
});