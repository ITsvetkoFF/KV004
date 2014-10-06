define(['./module'],function(directives){
    directives.directive('slider',function(){
        return {
            restrict: 'EA',

            controller: 'SlideCtrl',
            templateUrl: 'app/templates/slider.html',
            replace: true
        };
    });
});