define(['./module'], function (controllers) {
   'use strict';
    controllers.controller('addResourceCtrl',['$scope', '$rootScope', '$http', '$routeParams', function ($scope, $rootScope, $http, $routeParams) {
		$rootScope.$broadcast('Update', '_full');
		$scope.sendResource = function(Alias, Content, Title, IsResource) {
			if (Alias == '' || Content == '' || Title == '' || IsResource == '') {
                $scope.delPhotoErrorMsg = 'Всі поля обов\'язкові для заповнення';
                return;
            }
            $http.post('api/addResource', { Alias: Alias, Content: Content, Title: Title, IsResource: IsResource}).success(function() {
            console.log('Query has been successfully sent');
           }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
		};
	}]);
		});
