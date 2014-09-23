define(['./module'], function (controllers) {
   'use strict';
    controllers.controller('editorCtrl',['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
		if ($routeParams.Alias) {
		$http.get('http://ita-kv.tk:8090/api/resources/' + $routeParams.Alias).success(function(data) {
            $scope.resource = data[0];
            $scope.Alias = $routeParams.Alias;
			$scope.Content = $scope.resource.Content;
			$scope.Title = $scope.resource.Title;
            });
		}
		$rootScope.$broadcast('Update', '_full');
		$scope.sendResource = function(Alias, Content, Title) {
			if (Alias == '' || Content == '' || Title == '') {
                $scope.delPhotoErrorMsg = 'Всі поля обов\'язкові для заповнення';
                return;
            }
            $http.put('/api/editResource/' + $routeParams.Alias, {Alias: Alias, Content: Content, Title: Title}).success(function() {
            console.log('Query has been successfully sent');
           }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
		};
	}]);
		});
