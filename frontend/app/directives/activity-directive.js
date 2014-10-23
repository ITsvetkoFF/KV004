define(['./module'],function(directives){
    directives.directive('activity',function(){
        return {
            restrict: 'EA',
            templateUrl: 'app/templates/activity.html'

        };
    });
});
