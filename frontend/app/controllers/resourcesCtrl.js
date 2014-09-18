define(['./module', 'angular-sanitize'], function (controllers) {

   'use strict';
    controllers.controller('resourcesCtrl',['$scope','$http', '$routeParams', '$rootScope', function($scope,$http, $routeParams, $rootScope) {
            $http.get('http://ita-kv.tk:8090/api/resources/' + $routeParams.name).success(function(data) {
            $scope.resource = data[0];
            });
            $rootScope.$broadcast('Update', '_full');
        }])
});


