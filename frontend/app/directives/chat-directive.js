define(['./module'],function(directives){
    directives.directive('chat',function(){
        return {
            restrict: 'EA',
            controller: 'SocketCtrl',
            templateUrl: 'app/templates/chat.html',
            replace: true
        };
    });
});