define(['./module'], function (controllers) {
	'use strict';
    controllers.controller('Resources', [ '$scope', '$http', function($scope,$http){
        $http({ method: 'GET', url: 'http://ita-kv.tk:8090/api/getTitles' }).success(function (data) {
        $scope.data = data;
        for (var i = 0; i < $scope.data.length; i++) {
        	if ($scope.data[i].Alias === 'about') $scope.data.splice(i,1);
        }
 		});
 		 $scope.deleteResource = function(Alias) {
            $http.delete('/api/deleteResource/' + Alias)
        }
    }]);
});
