define(['./module'], function (controllers) {
   'use strict';
    controllers.controller('editorCtrl',['$scope', '$rootScope', function ($scope, $rootScope) {
		$scope.orightml = '<h2>Введіть сюди новий ресурс</h2>';
		$scope.htmlcontent = $scope.orightml;
		$rootScope.$broadcast('Update', '_full');
		$scope.hideDiv = function() {
			$rootScope.$broadcast('Update', '_hide');
		}
	}])
});


