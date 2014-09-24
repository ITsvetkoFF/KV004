define(['./module'],function(directives){
    directives.directive('activity',function(){
        return {
            restrict: 'EA',
            controller: 'showProblemCtrl',
            templateUrl: 'app/templates/activity.html'

        };
    });
});