define(['./module'],function(controllers){
    'use strict';
    controllers.controller('mainCtrl',['$scope','$rootScope', '$http' ,function($scope,$rootScope, $http){
        $scope.getTitles = function() {
            $http({ method: 'GET', url: 'api/getTitles' }).success(function (data) {
                $scope.data = data;
                for (var i = 0; i < $scope.data.length; i++) {
                    if ($scope.data[i].Alias === 'about') $scope.data.splice(i,1);
                }
            });
            $scope.deleteResource = function(Alias) {
                $http.delete('/api/deleteResource/' + Alias)
            };
        };

        $scope.showRigthSide = "_hide";

        $scope.hideDiv = function() {
            $scope.showRigthSide = "_hide";
        };
        $rootScope.$on("Update", function(event, message) {
            if ($scope.showRigthSide != message){
                $scope.showRigthSide = message;
            }
        });
    }]);
});
