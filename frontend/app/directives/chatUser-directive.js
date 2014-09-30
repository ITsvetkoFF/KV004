define(['./module'],function(directives){
    directives.directive('user',function($rootScope){

        return {
            restrict: 'EA',
            controller: 'SocketUserCtrl',
            templateUrl:'app/templates/userChatLine.html',
            replace: true
        };
    });
});