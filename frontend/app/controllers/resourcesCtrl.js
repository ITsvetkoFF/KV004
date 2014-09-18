define(['./module'], function (controllers) {

   'use strict';
    controllers.controller('resourcesCtrl',['$scope','$http', '$routeParams', function($scope,$http, $routeParams) {
            $http.get('http://ita-kv.tk:8090/api/resources/' + $routeParams.name).success(function(data) {
            $scope.resource = data[0];
            });
        }])
});


