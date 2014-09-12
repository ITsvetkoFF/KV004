define(['./module'], function (controllers) {
	'use strict';
    controllers.controller('Resources', [ '$scope', '$http', function($scope,$http){
        
        $http({ method: 'GET', url: 'http://localhost:8090/api/getTitles' }).success(function (data) {
        $scope.data = data.json;

        $scope.resource =function(){
            alert();
        }


 
 });
    }]);
});
