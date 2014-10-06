define(['./module'],function(directives){	
	directives.directive('notApproved', function(){
        return {
            restrict: 'A',
            templateUrl: 'app/templates/notApproved.html'
        }
    });
});    