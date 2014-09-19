define(['./module'], function (controllers) {
   'use strict';
    controllers.controller('editorCtrl',['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
		if ($routeParams.Alias) {
		$http.get('http://ita-kv.tk:8090/api/resources/' + $routeParams.Alias).success(function(data) {
            $scope.resource = data[0];
            });
		}
		console.log($scope.resource);
		if ($scope.resource) {
			$scope.Alias = $routeParams.Alias;
			$scope.Content = $scope.resource.Content;
			$scope.Title = $scope.resource.Title;
		}
		$rootScope.$broadcast('Update', '_full');
	}])
});


