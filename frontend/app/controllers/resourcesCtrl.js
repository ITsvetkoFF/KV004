define(['./module'], function (controllers) {

   'use strict';
    controllers.controller('resourcesCtrl',['$scope','$http', '$routeParams', '$rootScope', function($scope,$http, $routeParams, $rootScope) {
            $http.get('/api/resources/' + $routeParams.name).success(function(data) {
            $scope.resource = data[0];
            });
            $rootScope.$broadcast('Update', '_full');
        }])
});


