define(['./module'],function(directives){
    directives.directive('activity',function(){
        return {
            restrict: 'EA',
            controller:"ActivityCtrl",
            templateUrl: 'app/templates/activity.html'

        };
    });
});
