define(['./module'],function(directives){
	directives.directive('problemFilters', function(){
		return {
			restrict: 'A',
			templateUrl: 'app/templates/filters.html'
		}
	});
});